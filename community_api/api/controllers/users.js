const model = require('../models/users');

module.exports = {
    // 로그인
    login: (req, res) => {
        const result = model.login(req.body);
        if(result == -1){
            res.status(404).json({ "message": "user_not_found" });
        }
        else if (result) {
            res.status(200).json({
                "message": "login_success",
                "data": {
                    "id": result.id,
                    "profile_image_path": result.path
                }
            });
        }
        else {
            res.status(400).json({ "message": "login_failed" });
        }
    },
    // 로그아웃
    logout: (req, res) => {
        console.log("logout id: " + req.params.userId);
        res.status(200).json("this is logout");
    },
    // 회원가입
    signin: (req, res) => {
        const result = model.signin(req.body);
        if (result) {
            res.status(201).json({ "message": "account_create_success" });
        }
        else {
            res.status(400);
        }
    },
    // 이메일 중복체크
    emailChk: (req, res) => {
        const result = model.emailChk(req.query.email);
        if (result) {
            res.status(400).json({ "message": "email_already_exist" });
        }
        else {
            res.status(200).json({ "message": "available_email" });
        }

    },
    // 닉네임 중복체크
    nicknameChk: (req, res) => {
        const result = model.nicknameChk(req.query.nickname);
        if (result) {
            res.status(400).json({ "message": "nickname_already_exist" });
        }
        else {
            res.status(200).json({ "message": "available_nickname" });
        }
    },
    // id로 정보 조회
    getInfo: (req, res) => {
        const result = model.readInfo(req.params.userId);
        if (result) {
            res.status(200).json({
                "message":"user_info_read_success",
                "data": result
            });
        }
        else {
            res.status(404).json({ "message": "user_not_found" });
        }
    },
    // id 기준 정보 수정
    modifyInfo: (req, res) => {
        const result = model.modifyInfo(req.params.userId, req.body);
        if (result == 1) {
            res.status(201).json({ "message": "user_info_modify_success" });
        }
        else if (result == -1) {
            res.status(404).json({ "message": "user_not_found" });
        }
        else {
            res.status(400).json({ "message": "user_info_modify_failed" });
        }
    },
    // id 기준 비밀번호 수정
    changePassword: (req, res) => {
        const result = model.changePassword(req.params.userId, req.body.password);
        if (result == 1) {
            res.status(200).json({ "message": "user_password_change_success" });
        }
        else if (result == -1) {
            res.status(404).json({ "message": "user_not_found" });
        }
        else {
            res.status(400).json({ "message": "user_password_change_failed" });
        }
    },
    // 유저 삭제
    deleteUser: (req, res) => {
        const result = model.deleteUser(req.params.userId);
        if (result == 1) {
            res.status(200).json({ "message": `${req.params.userId} id deleted.` });
        }
        else if (result == -1) {
            res.status(404).json({ "message": "user_not_found" });
        }
        else {
            res.status(400).json({ "message": "user_delete_failed" });
        }
    }
}