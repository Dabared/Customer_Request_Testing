document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("requestForm");
  
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // prevent default form submission
  
      // Get form values
      const name = document.getElementById("name").value.trim();
      const details = document.getElementById("details").value.trim();
  
      if (!name || !details) {
        alert("Please fill in all required fields.");
        return;
      }
  
      // Prepare data to send
      const formData = {
        name: name,
        details: details
      };
  
      // Google Apps Script Web App URL
      const scriptURL = "https://script.google.com/macros/s/AKfycby-_Kra-4ZNCk8Hg7eSabx0vJiFIeS4VWVppK-CYfML1Us5ilEUO494NnxcKIvrqVA/exec";
  
      // Send data
      fetch(scriptURL, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.status === "success") {
          alert("✅ Request submitted successfully! \nYour Unit Code: " + data.unitCode);
          form.reset();
        } else {
          throw new Error(data.message || "Unknown error occurred.");
        }
      })
      .catch(error => {
        console.error("❌ Submission error:", error);
        alert("Error submitting request. Please try again later.");
      });
    });
  });
  