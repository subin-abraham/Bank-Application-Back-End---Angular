//import JWT ie is installed
const jwt = require('jsonwebtoken')

// import db
const db = require('./db')

// database
userdetails = {
  1000: { acno: 1000, username: "subin", password: 123, balance: 0, transaction: [] },
  1001: { acno: 1001, username: "Arjun", password: 456, balance: 0, transaction: [] },
  1002: { acno: 1002, username: "Benny", password: 789, balance: 0, transaction: [] },
  1003: { acno: 1003, username: "Shiva", password: 111, balance: 0, transaction: [] },
}

const register = (acno, username, password) => {
  return db.user.findOne({ acno })
    .then(user => {
      if (user) {
        return {
          status: "false",
          statusCode: 400,
          message: "user already registered"

        }
      }
      else {
        const newuser = new db.user({
          acno: acno,
          username: username,
          password: password,
          balance: 0,
          transaction: []
        })
        newuser.save(); //data saved in mongodb
        userdetails[acno] = { acno, username, password, balance: 0, transaction: [] }
        return {
          status: "true",
          statusCode: 200,
          message: "Successfully registered"
        }
      }
    })
}

const login = (acno, psw) => {
  return db.user.findOne({ acno, psw })
    .then(user => {
      if (user) {
        currentuser = user.username
        currentacno = acno
        const token = jwt.sign({ currentacno: acno }, 'superKey2022')
        return {
          status: "true",
          statusCode: 200,
          message: "Successfully login",
          token: token,
          currentuser:currentuser,
          currentacno:currentacno
        }

      }
      else {
        return {
          status: "false",
          statusCode: 400,
          message: "Invalid User Details"

        }
      }

    })

}
//   else {
//     return {
//       status: "false",
//       statusCode: 400,
//       message: "invalid userdetails"

//     }
//   }
// }
// login = (acno, psw) => {

//   if (acno in userdetails) {
//     if (psw == userdetails[acno]["password"]) {
//       currentuser = userdetails[acno]["username"]
//       currentacno = acno
//       //to generate token when login clicked
//       const token = jwt.sign({ currentacno: acno }, 'superKey2022')
//       return {
//         status: "true",
//         statusCode: 200,
//         message: "Successfully login",
//         token: token
//       }

//     }
//     else {
//       return {
//         status: "false",
//         statusCode: 400,
//         message: "password incorrect"

//       }
//     }
//   }
//   else {
//     return {
//       status: "false",
//       statusCode: 400,
//       message: "invalid userdetails"

//     }
//   }
// }


const deposit = (acno, psw, amnt) => {
  var amount = parseInt(amnt)
  return db.user.findOne({ acno, psw })
    .then(user => {
      if (user) {
        user.balance += amount;
        user.transaction.push({
          type: 'credit',
          Amount: amount
        })
        user.save();
        return {
          status: "true",
          statusCode: 200,
          message: `${amount} is successfuly credited and available balance is ${user.balance}`

        }
      }
      else {
        return {
          status: "false",
          statusCode: 400,
          message: "incorrect User Details"

        }

      }
    })
}


// deposit = (acno, psw, amnt) => {
//   //to convert amount datatype from string to int
//   amount = parseInt(amnt)
//   if (acno in userdetails) {
//     if (psw == userdetails[acno]["password"]) {
//       userdetails[acno]["balance"] += amount
//       // add deposit details in transaction array, arrayname.push
//       userdetails[acno]["transaction"].push({ type: 'CREDIT', amount })

//       return {
//         status: "true",
//         statusCode: 200,

//         message: `${amount} is successfuly credited and available balance is ${userdetails[acno]['balance']}`
//       }
//     }
//     else {
//       //  alert("Incorrect password")
//       return {
//         status: "false",
//         statusCode: 400,
//         message: "incorrect password"

//       }
//     }
//   }
//   else {
//     //  alert("Incorrect User")
//     return {
//       status: "false",
//       statusCode: 400,
//       message: "incorrect user"

//     }
//   }
// }

const withdraw = (acno, psw, amnt) => {
  var amount = parseInt(amnt)
  return db.user.findOne({ acno, psw })
    .then(user => {
      if (user) {
        if(user.balance>amount){
          user.balance -= amount
          user.transaction.push({
            type: 'debit',
            Amount: amount
          })
          user.save();
          return {
            status: "true",
            statusCode: 200,
            message: `${amount} is successfully debited and available balance is ${user.balance}`
  
          }
  

        }
      }
      else {
        return {
          status: "false",
          statusCode: 400,
          message: "insufficient balence"

        }

      }
    })
}



// withdraw = (acno, psw, amnt) => {
//   amount = parseInt(amnt)
//   if (acno in userdetails) {
//     if (psw == userdetails[acno]["password"]) {
//       if (amount <= userdetails[acno]["balance"]) {
//         userdetails[acno]["balance"] -= amount
//         //  add withdraw details  in transactiion array
//         userdetails[acno]["transaction"].push({ type: "DEBIT", amount })

//         return {
//           status: "true",
//           statusCode: 200,

//           message: `${amount} is successfuly debited and available balance is ${userdetails[acno]['balance']}`
//         }
//       }
//       else {
//         // alert("Insufficient balance")
//         return {
//           status: "false",
//           statusCode: 400,
//           message: "insufficient balance"

//         }
//       }
//     }
//     else {
//       // alert("incorrect password")
//       return {
//         status: "false",
//         statusCode: 400,
//         message: "incorrect password"

//       }
//     }
//   }
//   else {
//     // alert("incorrect user")
//     return {
//       status: "false",
//       statusCode: 400,
//       message: "incorrect user"

//     }
//   }
// }

const getTransaction = (acno) => {
  return db.user.findOne({acno})
  .then(user=>{
    if (user){
      return {
        status: "true",
        statusCode: 200,
        transaction: user.transaction
      }
  
    }
    else{
      return{
        status:"false",
        statusCode: 400,
        message:"invalid details"
      }
    }
  
  })
}
// getTransaction = (acno) => {
//   return {
//     status: "true",
//     statusCode: 200,
//     transaction: userdetails[acno]['transaction']
//   }
// }



// to delete accnt

const deleteAccnt=(acno)=>{
  return db.user.deleteOne({acno})
  .then(user=>{
    if(user){
      return {
        status: "true",
        statusCode: 200,
        message:'User deleted successfully'
      }
    }
    else{
      return{
        status:"false",
        statusCode: 400,
        message:"User not found"
      }
    }

  })
}



module.exports = {
  //give the function names required to export
  register, login, deposit, withdraw, getTransaction, deleteAccnt
}
