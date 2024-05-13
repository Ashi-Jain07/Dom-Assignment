// Function to handle form submission
document.getElementById("registrationform").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting
    
    // Collect form data
    var formData = {
        name: document.querySelector("#studentname").value,
        Id: document.querySelector("#studentid").value,
        class: document.querySelector("#class").value,
        email: document.querySelector("#email").value,
        contact: document.querySelector("#phoneno").value
    };

    // Convert data to JSON and encode it for url
    var encodedData = encodeURIComponent(JSON.stringify(formData));

    // Redirect to the other page with data in URL parameter
    window.location.href = "index2.html?data=" + encodedData;
})