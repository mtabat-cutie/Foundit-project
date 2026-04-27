Friend Module Program

    <STAThread()>
    Friend Sub Main(args As String())
        Application.SetHighDpiMode(HighDpiMode.SystemAware)
        Application.EnableVisualStyles()
        Application.SetCompatibleTextRenderingDefault(False)
        
        ' Initialize Supabase Database
        DataAccess.DatabaseHelper.InitializeDatabaseAsync().Wait()
        
        ' Run Application
        Application.Run(New Views.LoginForm)
    End Sub

End Module
