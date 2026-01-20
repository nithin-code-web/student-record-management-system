const API = "/students";

/* ---------- SIDEBAR NAVIGATION ---------- */
function showSection(id) {
  document.querySelectorAll(".section").forEach(s =>
    s.classList.add("hidden")
  );
  document.getElementById(id).classList.remove("hidden");
}

/* ---------- ADD STUDENT ---------- */
document.getElementById("addForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  const res = await fetch(`${API}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  document.getElementById("addMsg").innerText = result.message;

  e.target.reset();
});

/* ---------- VIEW STUDENTS ---------- */
async function loadStudents() {
  const res = await fetch(`${API}/all`);
  const students = await res.json();

  const tbody = document.getElementById("studentTable");
  tbody.innerHTML = "";

  students.forEach(s => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${s._id}</td>
      <td>${s.name}</td>
      <td>${s.rollNo}</td>
      <td>${s.department}</td>
      <td>${s.year}</td>
    `;
    tbody.appendChild(tr);
  });
}

/* ---------- DELETE STUDENT ---------- */
document.getElementById("deleteForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("deleteId").value;

  const res = await fetch(`${API}/delete/${id}`, {
    method: "DELETE"
  });

  const result = await res.text();
  document.getElementById("deleteMsg").innerText = result;

  e.target.reset();
});
