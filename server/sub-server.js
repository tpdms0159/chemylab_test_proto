const express = require('express');
const app = express();
const PORT = 8000;
const db = require('./lib/db');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

require('dotenv').config();

const secretKey = process.env.JWT_SECRET;

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json());
app.use(cors());

app.use((req, res, next) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1]; 

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403); // 유효하지 않은 토큰
            }
            req.user = user; // 유효한 토큰, user 정보를 req 객체에 추가
            next(); // 다음 미들웨어 또는 라우터 핸들러로 이동
        });
    } else {
        next();
    }
});





app.post("/balance", (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; // 헤더에서 토큰 추출
    const value = req.body.value;

    
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err); // 에러 출력
            return res.sendStatus(403); // 유효하지 않은 토큰
        }
    
        const username = user.username;
    
        // username에 해당하는 userId를 가져와야 함
        db.query('SELECT id FROM userTable WHERE username = ?', [username], function(error, results) {
            if (error) {
                console.log(error); // DB 에러 출력
                return res.status(500).send('Database error');
            }
    
            if (results.length > 0) {
                const userId = results[0].id; // 여기서 userId를 정의
    
                // userId를 사용해서 userBalance 테이블에 데이터 삽입
                db.query('INSERT INTO userBalance (userId, balacedata) VALUES (?, ?)', [userId, String(value)], function(error, results) {
                    if (error) {
                        console.log(error); // DB 에러 출력
                        return res.status(500).send('Database error');
                    }
    
                    res.send('Value inserted for the user');
                });
            } else {
                res.status(404).send('User not found');
            }
        });
    });
    
});


app.post("/values", (req, res) => {
    const values = req.body.values;

    if (!req.headers.authorization) {
        console.log('Authorization header is missing');
        return res.status(400).send('Authorization header is missing');
    }


    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        const username = user.username;

        db.query('SELECT id FROM userTable WHERE username = ?', [username], function(error, results) {
            if (error) {
                console.log(error);
                return res.status(500).send('Database error');
            }

            if (results.length > 0) {
                const userId = results[0].id;

                const promises = values.map(value => {
                    return new Promise((resolve, reject) => {
                        db.query('INSERT INTO valuedata (userId, value) VALUES (?, ?)', [userId, value], function(error, results) {
                            if (error) {
                                reject(error);
                            } else {
                                resolve();
                            }
                        });
                    });
                });

                Promise.all(promises)
                  .then(() => {
                    res.send('Values inserted for the user');
                  })
                  .catch(error => {
                    console.log(error);
                    res.status(500).send('Database error');
                  });
            } else {
                res.status(404).send('User not found');
            }
        });
    });
});


app.post("/person", (req, res) => {
    const values = req.body.values;

    if (!req.headers.authorization) {
        console.log('Authorization header is missing');
        return res.status(400).send('Authorization header is missing');
    }


    const token = req.headers.authorization.split(' ')[1];

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err);
            return res.sendStatus(403);
        }

        const username = user.username;

        db.query('SELECT id FROM userTable WHERE username = ?', [username], function(error, results) {
            if (error) {
                console.log(error);
                return res.status(500).send('Database error');
            }

            if (results.length > 0) {
                const userId = results[0].id;

                const promises = values.map(value => {
                    return new Promise((resolve, reject) => {
                        db.query('INSERT INTO persondata (userId, value) VALUES (?, ?)', [userId, value], function(error, results) {
                            if (error) {
                                reject(error);
                            } else {
                                resolve();
                            }
                        });
                    });
                });

                Promise.all(promises)
                  .then(() => {
                    res.send('Values inserted for the user');
                  })
                  .catch(error => {
                    console.log(error);
                    res.status(500).send('Database error');
                  });
            } else {
                res.status(404).send('User not found');
            }
        });
    });
});


app.post("/ment", (req, res) => {
    const ment = req.body.text;
    const randomNum = req.body.randomNum
    const token = req.headers.authorization.split(' ')[1];

    console.log(
        "ment: ", ment,
        "token: ", token,
        "randNum:" , randomNum
    );


    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err); // 에러 출력
            return res.sendStatus(403); // 유효하지 않은 토큰
        }
        console.log('pass jwt');
        const username = user.username

        // username에 해당하는 userId를 가져와야 함
        db.query('SELECT id FROM userTable WHERE username = ?', [username], function(error, results) {
            if (error) {
                console.log(error); // DB 에러 출력
                return res.status(500).send('Database error');
            }
        
            if (results.length > 0) {
                console.log('pass find userid');
                const userId = results[0].id; // 여기서 userId를 정의

                // userId를 사용해서 'mentdata' 컬럼에 데이터 삽입
                db.query('UPDATE userTable SET mentdata = ?, numdata = ? WHERE id = ?', [ment, randomNum, userId], function(error, results) {
                    res.send('come in userment query');
                    if (error) {
                        console.log(error); // DB 에러 출력
                        return res.status(500).send('Database error');
                    }
                    console.log('pass insert userment');
                });
            }
            else {
                return res.status(404).send('User not found');
            }
        })
                
    });
        
});



app.post("/login", (req, res) => {
    const username = req.body.userId;
    const password = req.body.userPassword;
    const sendData = {isLogin: ""};
    console.log(username);
    console.log(password);

    if (username && password) {
    
        db.query('SELECT * FROM userTable WHERE username = ?', [username], function(error, results) {
            if (error) throw error;
            
            if (results.length > 0) {
                bcrypt.compare(password, results[0].password, (err, result) => {
                    if (result === true) {
                        const user = {username : results[0].username };
                        const accessToken = jwt.sign(user, secretKey,{ expiresIn : '10m'})
                        sendData.isLogin = "True";
                        sendData.accessToken = accessToken;
                        res.send(sendData);
                    } else {
                        sendData.isLogin = "비밀번호가 일치하지 않습니다.";
                        res.send(sendData);
                    }
                });
            } else {
                sendData.isLogin = "아이디 정보가 일치하지 않습니다.";
                res.send(sendData);
            }
        });
    } else {
        sendData.isLogin = "아이디와 비밀번호를 입력하세요.";
        res.send(sendData);
    }
});




app.post("/signup", (req, res) => {
    const username = req.body.userId;
    const password = req.body.userPassword;
    const password2 = req.body.userPassword2;

    const sendData = { isSuccess: ""};

    if(username && password && password2){
        db.query('SELECT * FROM userTable WHERE username = ?', [username], function(error, results){
            if(error) throw error;
            if(results.length <= 0 && password == password2){
                const haswdPasswor = bcrypt.hashSync(password, 10);
                db.query('INSERT INTO userTable (username, password) VALUES(?,?)', [username, haswdPasswor], function(error, data){
                    if(error) throw error;
                    sendData.isSuccess = "True"
                    res.send(sendData)
                })
            } else if(password != password2){
                sendData.isSuccess = "입력된 비밀번호가 서로 다릅니다."
                res.send(sendData)
            } else{
                sendData.isSuccess = "이미 존재하는 아이디 입니다."
                res.send(sendData)
            }
        });
    } else {
        sendData.isSuccess = "아이디와 비밀번호를 입력하세요!"
        res.send(sendData)
    }
});

app.get("/result", (req, res) => {
    const token = req.headers.authorization.split(' ')[1]; 
    console.log(token);
    console.log("/result:type");
    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            console.log(err); // 에러 출력
            return res.sendStatus(403); // 유효하지 않은 토큰
        }
    
        const username = user.username;
    
        // username에 해당하는 numdata를 가져와야 함
        db.query('SELECT numdata FROM userTable WHERE username = ?', [username], function(error, results) {
            if (error) {
                console.log(error); // DB 에러 출력
                return res.status(500).send('Database error');
            }
            
            if (results.length > 0) {
                
                const numdata = results[0].numdata; // numdata 가져오기
                console.log('numdata', numdata);
                
                return res.send({numdata});
            } else {
                return res.status(404).send('User not found');
            }
        });
    });
})

app.get('/final', (req,res) => {
    
})

app.listen(PORT, (req,res) => {
    console.log(`${PORT}포트가 생성되었습니다.`);
})