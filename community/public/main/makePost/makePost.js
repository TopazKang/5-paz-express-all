import {getCookie, deleteCookie} from "../../utils/cookie.js";
import {API} from "../../config.js";
let image_path="";

setInfo();

async function setInfo() {
    const cookie_image = getCookie("image_path");
    document.getElementsByClassName("dropdownBtn")[0].src = cookie_image;
}

// 이미지 업로드
window.uploadImage = async function uploadImage() {
    const selectedFile = await document.getElementById("imageInput").files[0];


    // 선택된 파일의 여부에 따라 <원상복구> or <이미지 업로드 & 프리뷰>
    if (selectedFile) {
        console.log(selectedFile);
        const uri = await upload();
        image_path = uri;
    }

    // 이미지 업로드 및 path 반환용 함수
    async function upload() {
        const form = new FormData();
        form.append("file", selectedFile);
        const response = await fetch("/upload", {
            method: "POST",
            body: form
        });
        const data = await response.json();
        return data.path;
    }

}

window.chk = function chk(){
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;

    if (title && content){
        document.getElementsByClassName("helperText")[0].innerText="";
    }
    else{
        document.getElementsByClassName("helperText")[0].innerText="* 제목, 내용을 모두 작성해주세요.";
    }
        
}

// 포스트
window.post = async function post() {
    let title = document.getElementById("title").value;
    let content = document.getElementById("content").value;
    console.log(title)
    console.log(content)
    console.log(image_path)

    
    let params = {"title": title, "content": content, "post_image_path": image_path};
    let response = await fetch(`${API.posts}`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(params),
        credentials: 'include',
    })
    if(response.status == 401){
        deleteCookie("image_path");
        location.replace("/community");
    }
    else if(response.status == 201){
        alert("게시글 작성이 완료되었습니다");
        history.back();
    }
    else if(response.status == 404){
        alert("유저 계정을 찾을 수 없습니다.");
    }
    else if(response.status == 400){
        alert("게시글 작성에 실패하였습니다.")
    }
    
}

window.logout = function logout() {
    deleteCookie();
    location.href = "/community";
}