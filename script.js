const wrapper = document.querySelector(".wrapper"),
form = wrapper.querySelector("form"),
fileInp = form.querySelector("input"),
inforText = form.querySelector("p"),
closeBtn = wrapper.querySelector(".close"),
copyBtn = wrapper.querySelector(".copy");



function fetchRequest(formData, file){
    inforText.innerText = "Scanning QR Code... ";
    fetch("http://api.qrserver.com/v1/read-qr-code/",{
        method:"POST", body: formData
    }).then(res => res.json()).then(result => {
        result = result[0].symbol[0].data;
        inforText.innerText = result ? "Upload QR Code to Scan" : "Couldn't scan QR code";
        if(!result)return;
        wrapper.querySelector("textarea").innerText = result;
        form.querySelector("img").src = URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() =>{
        inforText.innerText = "Couldn't Scan QR code";
    });
}

fileInp.addEventListener("change", e=>{
    let file= e.target.files[0]; //getting user selected files
    if(!file)return;
    let formData = new FormData(); //creating a new formdata object
    formData.append("file", file); //adding selected file to formData
    fetchRequest(formData, file);
});

copyBtn.addEventListener("click", () =>{
    let text = wrapper.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
});


form.addEventListener("click", () => fileInp.click());
closeBtn.addEventListener("click", () => wrapper.classList.remove("active"));

