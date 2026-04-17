import customtkinter as ctk

class BrowseView(ctk.CTkFrame):
    def __init__(self, master, db_helper, **kwargs):
        super().__init__(master, **kwargs)
        self.db_helper = db_helper
        
        self.grid_columnconfigure(0, weight=1)
        self.grid_rowconfigure(2, weight=1)
        self.grid_rowconfigure(4, weight=1)
        
        self.label = ctk.CTkLabel(self, text="Viewing Module - All Items", font=ctk.CTkFont(size=24, weight="bold"))
        self.label.grid(row=0, column=0, padx=20, pady=(20, 10), sticky="w")
        
        # Lost Items Table
        self.lost_label = ctk.CTkLabel(self, text="Lost Items", font=ctk.CTkFont(size=18, weight="bold"))
        self.lost_label.grid(row=1, column=0, padx=20, pady=(10, 5), sticky="w")
        
        self.lost_scrollable = ctk.CTkScrollableFrame(self, height=200)
        self.lost_scrollable.grid(row=2, column=0, padx=20, pady=5, sticky="nsew")
        self.lost_scrollable.grid_columnconfigure((0,1,2,3), weight=1)
        
        # Found Items Table
        self.found_label = ctk.CTkLabel(self, text="Found Items", font=ctk.CTkFont(size=18, weight="bold"))
        self.found_label.grid(row=3, column=0, padx=20, pady=(20, 5), sticky="w")
        
        self.found_scrollable = ctk.CTkScrollableFrame(self, height=200)
        self.found_scrollable.grid(row=4, column=0, padx=20, pady=5, sticky="nsew")
        self.found_scrollable.grid_columnconfigure((0,1,2,3), weight=1)
        
        self.refresh()

    def refresh(self):
        # Clear existing
        for widget in self.lost_scrollable.winfo_children():
            widget.destroy()
        for widget in self.found_scrollable.winfo_children():
            widget.destroy()
            
        # Headers
        headers = ["Item Name", "Date", "Location", "Person"]
        for i, h in enumerate(headers):
            ctk.CTkLabel(self.lost_scrollable, text=h, font=ctk.CTkFont(weight="bold")).grid(row=0, column=i, padx=10, pady=5)
            ctk.CTkLabel(self.found_scrollable, text=h, font=ctk.CTkFont(weight="bold")).grid(row=0, column=i, padx=10, pady=5)
            
        # Fetch Data
        lost_items = self.db_helper.execute_query("SELECT item_name, date_lost, place_lost, reported_by FROM LostItems ORDER BY date_lost DESC")
        if lost_items:
            for r, item in enumerate(lost_items, start=1):
                ctk.CTkLabel(self.lost_scrollable, text=item['item_name']).grid(row=r, column=0, padx=10, pady=2)
                ctk.CTkLabel(self.lost_scrollable, text=str(item['date_lost'])).grid(row=r, column=1, padx=10, pady=2)
                ctk.CTkLabel(self.lost_scrollable, text=item['place_lost']).grid(row=r, column=2, padx=10, pady=2)
                ctk.CTkLabel(self.lost_scrollable, text=item['reported_by'] or "---").grid(row=r, column=3, padx=10, pady=2)
                
        found_items = self.db_helper.execute_query("SELECT item_name, date_found, location_found, turned_in_by FROM FoundItems ORDER BY date_found DESC")
        if found_items:
            for r, item in enumerate(found_items, start=1):
                ctk.CTkLabel(self.found_scrollable, text=item['item_name']).grid(row=r, column=0, padx=10, pady=2)
                ctk.CTkLabel(self.found_scrollable, text=str(item['date_found'])).grid(row=r, column=1, padx=10, pady=2)
                ctk.CTkLabel(self.found_scrollable, text=item['location_found']).grid(row=r, column=2, padx=10, pady=2)
                ctk.CTkLabel(self.found_scrollable, text=item['turned_in_by'] or "---").grid(row=r, column=3, padx=10, pady=2)
