Imports System.Threading.Tasks
Imports Supabase

Namespace DataAccess
    Public Class DatabaseHelper
        Private Shared ReadOnly Url As String = "https://vjsqdoqndijupxihcknw.supabase.co"
        Private Shared ReadOnly Key As String = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZqc3Fkb3FuZGlqdXB4aWhja253Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzY0MjEwODcsImV4cCI6MjA5MTk5NzA4N30.pbvSjIUgxnr7-nbA-9qJ3PvN1qOfZA-2AxDaM4j9q6g"
        
        Public Shared Client As Supabase.Client

        Public Shared Async Function InitializeDatabaseAsync() As Task
            Dim options = New SupabaseOptions With {
                .AutoConnectRealtime = True
            }
            Client = New Supabase.Client(Url, Key, options)
            Await Client.InitializeAsync()
        End Function
    End Class
End Namespace
