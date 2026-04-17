import customtkinter as ctk

class DashboardView(ctk.CTkFrame):
    def __init__(self, master, db_helper, **kwargs):
        super().__init__(master, **kwargs)
        self.db_helper = db_helper
        
        self.grid_columnconfigure(0, weight=1)
        self.grid_columnconfigure(1, weight=1)
        
        self.label = ctk.CTkLabel(self, text="Dashboard Overview", font=ctk.CTkFont(size=24, weight="bold"))
        self.label.grid(row=0, column=0, columnspan=2, padx=20, pady=(20, 10), sticky="w")
        
        # Stats Cards
        self.lost_stats = self.create_stat_card("Lost Items Reported", "0", 1, 0, "#FF5252")
        self.found_stats = self.create_stat_card("Found Items Recovered", "0", 1, 1, "#4CAF50")
        
        self.refresh()

    def create_stat_card(self, title, value, row, col, color):
        card = ctk.CTkFrame(self, fg_color=color, corner_radius=10)
        card.grid(row=row, column=col, padx=20, pady=20, sticky="nsew")
        
        title_label = ctk.CTkLabel(card, text=title, font=ctk.CTkFont(size=14), text_color="white")
        title_label.pack(pady=(15, 0))
        
        value_label = ctk.CTkLabel(card, text=value, font=ctk.CTkFont(size=36, weight="bold"), text_color="white")
        value_label.pack(pady=(0, 15))
        
        return value_label

    def refresh(self):
        lost_count = self.db_helper.execute_query("SELECT COUNT(*) as count FROM LostItems")[0]['count']
        found_count = self.db_helper.execute_query("SELECT COUNT(*) as count FROM FoundItems")[0]['count']
        
        self.lost_stats.configure(text=str(lost_count))
        self.found_stats.configure(text=str(found_count))
