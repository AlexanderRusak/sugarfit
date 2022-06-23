import { SQLError, SQLTransaction, openDatabase } from 'expo-sqlite'
import { SettingsParameters } from './store/types/settingsParameters'

const db = openDatabase('bodyParameters.db')

export class DB {
  static init() {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        /*         tx.executeSql(
                  `DROP TABLE IF EXISTS bodyParameters`,
                  [],
                  resolve,
                  (_: SQLTransaction, error: SQLError) => {
                    console.error("DB INIT error", error);
                    reject();
                    return false;
                  }
                ); */
        tx.executeSql(
          `CREATE TABLE IF NOT EXISTS settingsParameters (
                                                       id INTEGER PRIMARY KEY NOT NULL,
                                                       language TEXT NOT NULL, 
                                                       energy TEXT NOT NULL, 
                                                       color NUMBER NOT NULL
                                                      )`,
          ['english', 'calories', "#800020"],
          (_: SQLTransaction, result) => resolve(result.insertId),
          (_: SQLTransaction, error: SQLError) => {
            console.error("DB INIT error", error);
            reject();
            return false;
          }
        );

      })
    })
  }

  static getSettingsParameters() {
    return new Promise<SettingsParameters>((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          'SELECT * FROM settingsParameters',
          [],
          (_: SQLTransaction, result) => resolve(result.rows._array as unknown as SettingsParameters),
          (_: SQLTransaction, error: SQLError) => {
            console.error("DB GET error", error);
            reject(error);
            return false
          }
        )
      })
    })
  }

  static createSettingsParameters({ language, energy, color }: SettingsParameters) {
    return new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO settingsParameters (language, energy, color) VALUES (?, ?, ?, )`,
          [language, energy, color],
          (_: SQLTransaction, result) => resolve(result.insertId),
          (_: SQLTransaction, error: SQLError) => {
            console.error("DB UPDATE error", error);
            reject(error);
            return false
          }
        )
      })
    })
  }
}

/*         tx.executeSql(
`INSERT INTO bodyParameters (id, age, sex, height, weigh) VALUES (1, 0, '', 0, 0)`,
[],
resolve,
(_: SQLTransaction, error: SQLError) => {
console.error("DB INIT error", error);
reject();
return false;
}
); */


/* return new Promise((resolve, reject) => {
  db.transaction(tx => {
    tx.executeSql(
      `UPDATE bodyParameters SET age = ?, sex = ?, height = ?, weigh = ? WHERE id = ?`,
      [age, sex, height, weigh, 1],
      (_: SQLTransaction, result) => resolve(result.insertId),
      (_: SQLTransaction, error: SQLError) => {
        console.error("DB UPDATE error", error);
        reject(error);
        return false
      }
    )
  })
})
}
} */