Imports System.Drawing
Imports System.Windows.Forms
Imports System.Threading.Tasks

Namespace Views
    Public Class LoginForm
        Inherits Form

        Private txtEmail As TextBox
        Private txtPassword As TextBox
        Private btnLogin As Button
        Private lblMessage As Label

        Public Sub New()
            Me.Text = "FoundiT - Login"
            Me.Size = New Size(400, 300)
            Me.StartPosition = FormStartPosition.CenterScreen
            Me.FormBorderStyle = FormBorderStyle.FixedDialog
            Me.MaximizeBox = False

            Dim lblTitle As New Label()
            lblTitle.Text = "Login to FoundiT"
            lblTitle.Font = New Font("Segoe UI", 16, FontStyle.Bold)
            lblTitle.Location = New Point(100, 20)
            lblTitle.AutoSize = True
            Me.Controls.Add(lblTitle)

            Dim lblUser As New Label()
            lblUser.Text = "Email:"
            lblUser.Location = New Point(50, 80)
            lblUser.AutoSize = True
            Me.Controls.Add(lblUser)

            txtEmail = New TextBox()
            txtEmail.Location = New Point(150, 77)
            txtEmail.Width = 180
            Me.Controls.Add(txtEmail)

            Dim lblPass As New Label()
            lblPass.Text = "Password:"
            lblPass.Location = New Point(50, 120)
            lblPass.AutoSize = True
            Me.Controls.Add(lblPass)

            txtPassword = New TextBox()
            txtPassword.Location = New Point(150, 117)
            txtPassword.Width = 180
            txtPassword.PasswordChar = "*"c
            Me.Controls.Add(txtPassword)

            btnLogin = New Button()
            btnLogin.Text = "Login"
            btnLogin.Location = New Point(150, 160)
            btnLogin.Width = 100
            btnLogin.Height = 35
            btnLogin.BackColor = Color.Maroon
            btnLogin.ForeColor = Color.White
            btnLogin.FlatStyle = FlatStyle.Flat
            AddHandler btnLogin.Click, AddressOf BtnLogin_Click
            Me.Controls.Add(btnLogin)

            lblMessage = New Label()
            lblMessage.Text = ""
            lblMessage.Location = New Point(50, 210)
            lblMessage.Width = 300
            lblMessage.ForeColor = Color.Red
            Me.Controls.Add(lblMessage)
        End Sub

        Private Async Sub BtnLogin_Click(sender As Object, e As EventArgs)
            Dim email = txtEmail.Text.Trim()
            Dim password = txtPassword.Text

            If String.IsNullOrEmpty(email) OrElse String.IsNullOrEmpty(password) Then
                lblMessage.Text = "Please enter both email and password."
                Return
            End If

            btnLogin.Enabled = False
            lblMessage.Text = "Logging in..."
            lblMessage.ForeColor = Color.Black

            Try
                ' Authenticate using Supabase Auth
                Dim session = Await DataAccess.DatabaseHelper.Client.Auth.SignIn(email, password)
                
                If session IsNot Nothing AndAlso session.User IsNot Nothing Then
                    Me.Hide()
                    Dim dashboard As New DashboardForm()
                    dashboard.ShowDialog()
                    Me.Close()
                Else
                    lblMessage.Text = "Invalid email or password."
                    lblMessage.ForeColor = Color.Red
                End If
            Catch ex As Exception
                lblMessage.Text = "Login failed: " & ex.Message
                lblMessage.ForeColor = Color.Red
            Finally
                btnLogin.Enabled = True
            End Try
        End Sub
    End Class
End Namespace
