Imports System.Drawing
Imports System.Windows.Forms
Imports System.Threading.Tasks
Imports FoundiT_VB.Models

Namespace Views
    Public Class DashboardForm
        Inherits Form

        Private lblLostCount As Label
        Private lblFoundCount As Label

        Public Sub New()
            Me.Text = "FoundiT - Dashboard"
            Me.Size = New Size(800, 600)
            Me.StartPosition = FormStartPosition.CenterScreen
            
            Dim mainPanel As New Panel()
            mainPanel.Dock = DockStyle.Fill
            mainPanel.BackColor = Color.WhiteSmoke
            Me.Controls.Add(mainPanel)

            ' Title
            Dim lblTitle As New Label()
            lblTitle.Text = "FoundiT Dashboard"
            lblTitle.Font = New Font("Segoe UI", 24, FontStyle.Bold)
            lblTitle.ForeColor = Color.Maroon
            lblTitle.Location = New Point(30, 20)
            lblTitle.AutoSize = True
            mainPanel.Controls.Add(lblTitle)

            ' Stats Panel
            Dim statsPanel As New FlowLayoutPanel()
            statsPanel.Location = New Point(30, 80)
            statsPanel.Size = New Size(700, 150)
            mainPanel.Controls.Add(statsPanel)

            ' Lost Card
            Dim pnlLost As New Panel()
            pnlLost.Size = New Size(200, 100)
            pnlLost.BackColor = Color.IndianRed
            pnlLost.Margin = New Padding(10)
            
            Dim lblLostTitle As New Label()
            lblLostTitle.Text = "Lost Items"
            lblLostTitle.ForeColor = Color.White
            lblLostTitle.Location = New Point(10, 10)
            lblLostTitle.Font = New Font("Segoe UI", 12)
            pnlLost.Controls.Add(lblLostTitle)

            lblLostCount = New Label()
            lblLostCount.Text = "0"
            lblLostCount.ForeColor = Color.White
            lblLostCount.Location = New Point(10, 40)
            lblLostCount.Font = New Font("Segoe UI", 24, FontStyle.Bold)
            pnlLost.Controls.Add(lblLostCount)

            statsPanel.Controls.Add(pnlLost)

            ' Found Card
            Dim pnlFound As New Panel()
            pnlFound.Size = New Size(200, 100)
            pnlFound.BackColor = Color.MediumSeaGreen
            pnlFound.Margin = New Padding(10)
            
            Dim lblFoundTitle As New Label()
            lblFoundTitle.Text = "Found Items"
            lblFoundTitle.ForeColor = Color.White
            lblFoundTitle.Location = New Point(10, 10)
            lblFoundTitle.Font = New Font("Segoe UI", 12)
            pnlFound.Controls.Add(lblFoundTitle)

            lblFoundCount = New Label()
            lblFoundCount.Text = "0"
            lblFoundCount.ForeColor = Color.White
            lblFoundCount.Location = New Point(10, 40)
            lblFoundCount.Font = New Font("Segoe UI", 24, FontStyle.Bold)
            pnlFound.Controls.Add(lblFoundCount)

            statsPanel.Controls.Add(pnlFound)

            ' Buttons Panel
            Dim btnPanel As New FlowLayoutPanel()
            btnPanel.Location = New Point(30, 250)
            btnPanel.Size = New Size(700, 100)
            mainPanel.Controls.Add(btnPanel)

            Dim btnReportLost As New Button()
            btnReportLost.Text = "Report Lost Item"
            btnReportLost.Size = New Size(150, 40)
            btnReportLost.BackColor = Color.Maroon
            btnReportLost.ForeColor = Color.White
            AddHandler btnReportLost.Click, AddressOf BtnReportLost_Click
            btnPanel.Controls.Add(btnReportLost)

            Dim btnReportFound As New Button()
            btnReportFound.Text = "Report Found Item"
            btnReportFound.Size = New Size(150, 40)
            btnReportFound.BackColor = Color.Maroon
            btnReportFound.ForeColor = Color.White
            AddHandler btnReportFound.Click, AddressOf BtnReportFound_Click
            btnPanel.Controls.Add(btnReportFound)

            ' DataGrid
            Dim dgvItems As New DataGridView()
            dgvItems.Location = New Point(30, 320)
            dgvItems.Size = New Size(720, 200)
            dgvItems.ReadOnly = True
            dgvItems.AllowUserToAddRows = False
            mainPanel.Controls.Add(dgvItems)

            AddHandler Me.Load, AddressOf DashboardForm_Load
        End Sub

        Private Async Sub DashboardForm_Load(sender As Object, e As EventArgs)
            Await RefreshStatsAsync()
        End Sub

        Private Async Function RefreshStatsAsync() As Task
            Try
                Dim lostResult = Await DataAccess.DatabaseHelper.Client.From(Of LostItem)().Get()
                lblLostCount.Text = lostResult.Models.Count.ToString()

                Dim foundResult = Await DataAccess.DatabaseHelper.Client.From(Of FoundItem)().Get()
                lblFoundCount.Text = foundResult.Models.Count.ToString()
            Catch ex As Exception
                MessageBox.Show("Error fetching stats from Supabase: " & ex.Message)
            End Try
        End Function

        Private Sub BtnReportLost_Click(sender As Object, e As EventArgs)
            Dim reportForm As New ReportItemForm("Lost")
            reportForm.ShowDialog()
            ' Fire and forget refresh
            Call RefreshStatsAsync()
        End Sub

        Private Sub BtnReportFound_Click(sender As Object, e As EventArgs)
            Dim reportForm As New ReportItemForm("Found")
            reportForm.ShowDialog()
            Call RefreshStatsAsync()
        End Sub
    End Class
End Namespace
