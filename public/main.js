var base64Image = "";
function loadFile(event) {
    const image = event.target.files[0];
    if (image) {
      var reader = new FileReader();
  
      reader.onload = function (e) {
        document.getElementById("inputimg").src = e.target.result;
        document.getElementById("inputimg").width = 400;
        document.getElementById("inputimg").height = 400;
        base64Image = e.target.result.replace("data:image/jpeg;base64,", "")
      };

        reader.readAsDataURL(image);
    }
}

function uploadImage() {
    const file = document.getElementById("file").files[0];
    if (!file) {
        alert("Please select a file");
        return;
    }

    document.getElementById("outputimg").src = ""
    let obj = {
        userId: "yantralivetest@gmail.com",
        base64: base64Image,
    }
    fetch("https://api.mayamaya.us/uploadImageToGCP", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
    }).then(async (GCPresponse) => {
        const GCPData = await GCPresponse.json();
        console.log(GCPData, "GCPData");
        fetch("https://image-enhancement-backend-raviteja-yl.vercel.app/img_enhancer", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ fileUrl: GCPData.result }),
        }).then(async (replicate_response) => {
            const replicateData = await replicate_response.json();
            console.log(replicateData, "replicateData");
            document.getElementById("outputimg").src = replicateData.result;
            document.getElementById("outputimg").width = 400;
            document.getElementById("outputimg").height = 400;
        }).catch((error) => {
            console.log(error);
        });
    }).catch((error) => {
        console.log(error);
    });
}

function reset() {
    document.getElementById("inputimg").src = "https://replicate.delivery/mgxm/59d9390c-b415-47e0-a907-f81b0d9920f1/187400315-87a90ac9-d231-45d6-b377-38702bd1838f.jpg";
    document.getElementById("outputimg").src = "https://replicate.delivery/mgxm/59d9390c-b415-47e0-a907-f81b0d9920f1/187400315-87a90ac9-d231-45d6-b377-38702bd1838f.jpg";
    document.getElementById("file").value = "";
    base64Image = "";
}

function imageopen(url) {
    window.open(url);
}