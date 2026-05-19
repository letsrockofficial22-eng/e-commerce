export default function UsersTab({ users, logins }) {
  return (
    <div>
      <h2>Users & Login Tracking</h2>

      <div style={{ marginBottom: '3rem' }}>
        <h3>Registered Users</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className="status-badge" style={{ background: user.role === 'admin' ? '#cfe2ff' : '#d1e7dd', color: user.role === 'admin' ? '#0c63e4' : '#0f5132' }}>
                    {user.role}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {users.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem' }}>No users found.</p>
        )}
      </div>

      <div>
        <h3>Login History</h3>
        <table className="admin-table">
          <thead>
            <tr>
              <th>User Email</th>
              <th>Login Time</th>
              <th>Device/Browser</th>
            </tr>
          </thead>
          <tbody>
            {logins.map((login, index) => (
              <tr key={index}>
                <td>{login.email}</td>
                <td>{new Date(login.loginTime).toLocaleString()}</td>
                <td>{login.userAgent?.substring(0, 50) || 'Unknown'}...</td>
              </tr>
            ))}
          </tbody>
        </table>
        {logins.length === 0 && (
          <p style={{ textAlign: 'center', padding: '2rem' }}>No login history found.</p>
        )}
      </div>
    </div>
  )
}
