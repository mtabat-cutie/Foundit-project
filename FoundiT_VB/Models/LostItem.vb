Imports Postgrest.Attributes
Imports Postgrest.Models

Namespace Models
    <Table("LostItems")>
    Public Class LostItem
        Inherits BaseModel

        <PrimaryKey("id")>
        Public Property Id As String

        <Column("item_name")>
        Public Property ItemName As String

        <Column("description")>
        Public Property Description As String

        <Column("date_lost")>
        Public Property DateLost As String

        <Column("place_lost")>
        Public Property PlaceLost As String

        <Column("reported_by")>
        Public Property ReportedBy As String

        <Column("status")>
        Public Property Status As String
        
        <Column("created_at")>
        Public Property CreatedAt As DateTime
    End Class
End Namespace
