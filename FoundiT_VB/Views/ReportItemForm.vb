Imports System.Drawing
Imports System.Windows.Forms
Imports System.Threading.Tasks
Imports FoundiT_VB.Models

Namespace Views
    Public Class ReportItemForm
        Inherits Form

        Private _mode As String ' "Lost" or "Found"
        Private txtItemName As TextBox
        Private txtDescription As TextBox
        Private txtLocation As TextBox
        Private txtPersonName As TextBox
        Private btnSubmit As Button

        Public Sub New(mode As String)
            _mode = mode
            Me.Text = "Report " & _mode & " Item"
            Me.Size = New Size(400, 450)
            Me.StartPosition = FormStartPosition.CenterParent
            Me.FormBorderStyle = FormBorderStyle.FixedDialog
            Me.MaximizeBox = False

            Dim lblTitle As New Label()
            lblTitle.Text = "Report " & _mode & " Item"
            lblTitle.Font = New Font("Segoe UI", 16, FontStyle.Bold)
            lblTitle.Location = New Point(30, 20)
            lblTitle.AutoSize = True
            Me.Controls.Add(lblTitle)

            ' Item Name
            Dim lblName As New Label()
            lblName.Text = "Item Name:"
            lblName.Location = New Point(30, 80)
            Me.Controls.Add(lblName)

            txtItemName = New TextBox()
            txtItemName.Location = New Point(150, 77)
            txtItemName.Width = 200
            Me.Controls.Add(txtItemName)

            ' Description
            Dim lblDesc As New Label()
            lblDesc.Text = "Description:"
            lblDesc.Location = New Point(30, 120)
            Me.Controls.Add(lblDesc)

            txtDescription = New TextBox()
            txtDescription.Location = New Point(150, 117)
            txtDescription.Width = 200
            txtDescription.Multiline = True
            txtDescription.Height = 60
            Me.Controls.Add(txtDescription)

            ' Location
            Dim lblLoc As New Label()
            lblLoc.Text = If(_mode = "Lost", "Place Lost:", "Location Found:")
            lblLoc.Location = New Point(30, 200)
            Me.Controls.Add(lblLoc)

            txtLocation = New TextBox()
            txtLocation.Location = New Point(150, 197)
            txtLocation.Width = 200
            Me.Controls.Add(txtLocation)

            ' Person Name
            Dim lblPerson As New Label()
            lblPerson.Text = If(_mode = "Lost", "Reported By:", "Turned In By:")
            lblPerson.Location = New Point(30, 240)
            Me.Controls.Add(lblPerson)

            txtPersonName = New TextBox()
            txtPersonName.Location = New Point(150, 237)
            txtPersonName.Width = 200
            Me.Controls.Add(txtPersonName)

            ' Submit Button
            btnSubmit = New Button()
            btnSubmit.Text = "Submit"
            btnSubmit.Location = New Point(150, 290)
            btnSubmit.Width = 100
            btnSubmit.Height = 35
            btnSubmit.BackColor = Color.Maroon
            btnSubmit.ForeColor = Color.White
            btnSubmit.FlatStyle = FlatStyle.Flat
            AddHandler btnSubmit.Click, AddressOf BtnSubmit_Click
            Me.Controls.Add(btnSubmit)
        End Sub

        Private Async Sub BtnSubmit_Click(sender As Object, e As EventArgs)
            If String.IsNullOrWhiteSpace(txtItemName.Text) OrElse String.IsNullOrWhiteSpace(txtPersonName.Text) Then
                MessageBox.Show("Please fill in the item name and your name.", "Validation Error", MessageBoxButtons.OK, MessageBoxIcon.Warning)
                Return
            End If

            btnSubmit.Enabled = False
            btnSubmit.Text = "Submitting..."

            Try
                If _mode = "Lost" Then
                    Dim newLostItem As New LostItem With {
                        .ItemName = txtItemName.Text,
                        .Description = txtDescription.Text,
                        .PlaceLost = txtLocation.Text,
                        .ReportedBy = txtPersonName.Text,
                        .DateLost = DateTime.Now.ToString("yyyy-MM-dd"),
                        .Status = "Lost",
                        .CreatedAt = DateTime.UtcNow
                    }
                    Await DataAccess.DatabaseHelper.Client.From(Of LostItem)().Insert(newLostItem)
                Else
                    Dim newFoundItem As New FoundItem With {
                        .ItemName = txtItemName.Text,
                        .Description = txtDescription.Text,
                        .LocationFound = txtLocation.Text,
                        .TurnedInBy = txtPersonName.Text,
                        .DateFound = DateTime.Now.ToString("yyyy-MM-dd"),
                        .Status = "Found",
                        .CreatedAt = DateTime.UtcNow
                    }
                    Await DataAccess.DatabaseHelper.Client.From(Of FoundItem)().Insert(newFoundItem)
                End If

                MessageBox.Show(_mode & " item reported successfully to Supabase!", "Success", MessageBoxButtons.OK, MessageBoxIcon.Information)
                Me.Close()
            Catch ex As Exception
                MessageBox.Show("Failed to insert into Supabase: " & ex.Message, "Error", MessageBoxButtons.OK, MessageBoxIcon.Error)
            Finally
                btnSubmit.Enabled = True
                btnSubmit.Text = "Submit"
            End Try
        End Sub
    End Class
End Namespace
