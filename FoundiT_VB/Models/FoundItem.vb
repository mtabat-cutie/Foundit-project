Imports Postgrest.Attributes
Imports Postgrest.Models

Namespace Models
    <Table("FoundItems")>
    Public Class FoundItem
        Inherits BaseModel

        <PrimaryKey("id")>
        Public Property Id As String

        <Column("item_name")>
        Public Property ItemName As String

        <Column("description")>
        Public Property Description As String

        <Column("date_found")>
        Public Property DateFound As String

        <Column("location_found")>
        Public Property LocationFound As String

        <Column("turned_in_by")>
        Public Property TurnedInBy As String

        <Column("status")>
        Public Property Status As String
        
        <Column("created_at")>
        Public Property CreatedAt As DateTime
    End Class
End Namespace
