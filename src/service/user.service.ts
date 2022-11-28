import db from '../database/index';
import  { 
  createUserQuery, 
  getUserByIdQuery, 
  getUserByEmailQuery,
  deleteUserByIdQuery,
  createEventsQuery,
  updateEventsQuery,
  updateUserConsentsQuery,
  getUserEventThatIsEnabledQuery 
}  from '../database/user.model';
export {};
export async function createUser(
  input: 
  {
    email: string,
  }
): Promise<any[]> {
  try{
  const {
    email
  } = input;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (!emailRegex.test(email)) {
    throw new Error('Invalid email');
  }
  const user = await db.query(getUserByEmailQuery, [email]);
  if (user.rows.length > 0) {
    throw new Error('Email already in use');
  }
  const { rows: result } = await db.query(createUserQuery, [
    email
  ]);
  return result;
} catch (error: any) {
  throw new Error(error);
}
}

export async function getUserById(
  id: number
): Promise<any> {
  try {
    interface result {
      [key: string]: any;
     }
    let result:(result) = await db.query(getUserByIdQuery,
      [id]
    );
    return result.rows[0];
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function deleteUserById(
  id: number
): Promise<any[]> {
  try {
    const { rows: result } = await db.query(deleteUserByIdQuery,
      [id]
    );
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}
interface user {
  [key: string]: any;
 }
 interface result {
  [key: string]: any;
  }
export async function createEvents(
  input: 
  {
    id: string,
    user_id: number,
  },
): Promise<any> {
  try {
    const {
      id,
      user_id
    } = input;
    await db.query(updateEventsQuery, [user_id]);
    let result:(result)  = await db.query(createEventsQuery,
      [id, true, user_id]
    );
    let user:(user) = await db.query(getUserByIdQuery, [user_id]);
    if(user.rows[0] === null){
      throw new Error('User not found');
    }
    let consents = user.rows[0].consents;
    if(consents === null){
      consents = [];
    }
    const consentsArray: { id: string; enabled: boolean; }[] = [];
    if(consents !== null){
      consents.forEach(async (consent: any) => {
        const event = JSON.parse(consent);
        consentsArray.push({
          id: event.id,
          enabled: false
        });
      });
      await db.query(updateUserConsentsQuery, [consentsArray, user_id]);
    }
    consentsArray.push({
      id: result.rows[0].id,
      enabled: result.rows[0].enabled,
    });
    await db.query('UPDATE users SET consents = $1 WHERE id = $2', [consentsArray, user_id]);
    return result;
  } catch (error: any) {
    throw new Error(error);
  }
}


