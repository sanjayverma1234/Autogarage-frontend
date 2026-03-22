function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    window.location.href = '../login.html';
}

// Check admin login
const token = localStorage.getItem('token');
const role = localStorage.getItem('role');
if (!token || role !== 'admin') {
    window.location.href = '../login.html';
}

window.logout = logout;
