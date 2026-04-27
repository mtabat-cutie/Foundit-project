Imports Postgrest.Attributes
Imports Postgrest.Models

Namespace Models
    <Table("Profiles")>
    Public Class Profile
        Inherits BaseModel

        <PrimaryKey("id")>
        Public Property Id As String

        <Column("username")>
        Public Property Username As String

        <Column("password_hash")>
        Public Property PasswordHash As String

        <Column("full_name")>
        Public Property FullName As String

        <Column("role")>
        Public Property Role As String
    End Class
End Namespace
