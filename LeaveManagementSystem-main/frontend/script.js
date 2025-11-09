let token = "";
let currentRole = "";

// Handle showing login form for selected role
function showLogin(role) {
    currentRole = role;
    document.getElementById("loginChoice").style.display = "none";
    document.getElementById("loginFormContainer").style.display = "block";
    document.getElementById("loginTitle").innerText = `Login as ${role}`;
}

// LOGIN
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("http://localhost:8086/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    })
        .then(res => res.text())
        .then(data => {
            if (data.startsWith("Bearer ")) {
                token = data;
                document.getElementById("loginStatus").innerText = "Login successful";

                document.getElementById("loginFormContainer").style.display = "none";
                document.getElementById("logoutSection").style.display = "block";

                if (currentRole === "USER") {
                    document.getElementById("userSection").style.display = "block";
                } else {
                    document.getElementById("adminSection").style.display = "block";
                }

            } else {
                document.getElementById("loginStatus").innerText = "Login failed";
            }
        })
        .catch(err => {
            console.error(err);
            document.getElementById("loginStatus").innerText = "Error during login";
        });
});

// APPLY LEAVE (User)
document.getElementById("leaveForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const fromDate = document.getElementById("fromDate").value;
    const toDate = document.getElementById("toDate").value;
    const reason = document.getElementById("reason").value;
    const email = document.getElementById("email").value;

    fetch("http://localhost:8086/leave/apply", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ email, fromDate, toDate, reason })
    })
        .then(res => res.text())
        .then(data => {
            document.getElementById("leaveStatus").innerText = data;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("leaveStatus").innerText = "Error applying leave";
        });
});

// APPROVE LEAVE (Admin)
function approveLeave() {
    const id = document.getElementById("approveId").value;

    fetch(`http://localhost:8086/leave/approve/${id}`, {
        method: "POST",
        headers: {
            "Authorization": token
        }
    })
        .then(res => res.text())
        .then(data => {
            document.getElementById("approveStatus").innerText = data;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("approveStatus").innerText = "Error approving leave";
        });
}

// REJECT LEAVE (Admin)
function rejectLeave() {
    const id = document.getElementById("rejectId").value;

    fetch(`http://localhost:8086/leave/reject/${id}`, {
        method: "POST",
        headers: {
            "Authorization": token
        }
    })
        .then(res => res.text())
        .then(data => {
            document.getElementById("rejectStatus").innerText = data;
        })
        .catch(err => {
            console.error(err);
            document.getElementById("rejectStatus").innerText = "Error rejecting leave";
        });
}

// LOGOUT
function logout() {
    token = "";
    currentRole = "";

    document.getElementById("loginChoice").style.display = "block";
    document.getElementById("loginFormContainer").style.display = "none";
    document.getElementById("userSection").style.display = "none";
    document.getElementById("adminSection").style.display = "none";
    document.getElementById("logoutSection").style.display = "none";
    document.getElementById("loginForm").reset();
    document.getElementById("leaveForm").reset();
    document.getElementById("approveId").value = "";
    document.getElementById("rejectId").value = "";
    document.getElementById("loginStatus").innerText = "";
    document.getElementById("leaveStatus").innerText = "";
    document.getElementById("approveStatus").innerText = "";
    document.getElementById("rejectStatus").innerText = "";
}
