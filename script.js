function verifyCert() {
  const id = document.getElementById("certInput").value;
  const result = document.getElementById("result");

  fetch("data.json")
    .then(res => res.json())
    .then(data => {
      const cert = data.find(c => c.certificate_id === id);

      if (!cert) {
        result.innerHTML = `<h2 style="color:red;">❌ Invalid Certificate</h2>`;
        return;
      }

      result.innerHTML = `
<div class="overlay">
  <div class="modal">

    <div class="header">
      <span class="closeX" onclick="closeModal()">✖</span>
      <h2>✅ Valid Certificate</h2>
      <p>Official & Verified Record</p>
    </div>

    <div class="content">

      <h3>${cert.name}</h3>

      <div class="grid">
        <div>
          <span class="label">REG NO</span>
          <div class="value">${cert.reg_no}</div>
        </div>

        <div>
          <span class="label">MODE</span>
          <div class="value">${cert.mode}</div>
        </div>
      </div>

      <div class="block">
        <span class="label">COURSE</span>
        <div class="value">${cert.course}</div>
      </div>

      <div class="block">
        <span class="label">INSTITUTION</span>
        <div class="value">${cert.institution}</div>
      </div>

      <div class="block">
        <span class="label">DURATION</span>
        <div class="value">${cert.duration}</div>
      </div>

      <hr>

      <div class="grid">
        <div>
          <span class="label">TERM</span>
          <div class="value">${cert.term}</div>
        </div>

        <div>
          <span class="label">ISSUED ON</span>
          <div class="value">${cert.issued_on}</div>
        </div>
      </div>

    </div>

    <div class="actions">
      <button class="close" onclick="closeModal()">Close Verification</button>
      <button class="download" onclick="downloadCertificate('${cert.file}')">
  Download Certificate Copy
</button>
    </div>

  </div>
</div>
`;
    });
}

function closeModal() {
  document.getElementById("result").innerHTML = "";
}
function downloadCertificate(filePath) {
  const link = document.createElement("a");
  link.href = filePath;
  link.download = filePath.split('/').pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}