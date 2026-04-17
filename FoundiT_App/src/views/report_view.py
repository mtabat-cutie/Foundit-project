import customtkinter as ctk
from datetime import date

class ReportView(ctk.CTkFrame):
    def __init__(self, master, db_helper, mode="lost", **kwargs):
        super().__init__(master, **kwargs)
        self.db_helper = db_helper
        self.mode = mode # "lost" or "found"
        
        self.grid_columnconfigure(0, weight=1)
        
        title = "Report Lost Item" if mode == "lost" else "Report Found Item"
        self.label = ctk.CTkLabel(self, text=title, font=ctk.CTkFont(size=24, weight="bold"))
        self.label.grid(row=0, column=0, padx=20, pady=(20, 10), sticky="w")
        
        # Form Container
        self.form_frame = ctk.CTkFrame(self)
        self.form_frame.grid(row=1, column=0, padx=20, pady=10, sticky="nsew")
        self.form_frame.grid_columnconfigure(1, weight=1)
        
        # Item Name
        self.name_label = ctk.CTkLabel(self.form_frame, text="Item Name:")
        self.name_label.grid(row=0, column=0, padx=20, pady=10, sticky="e")
        self.name_entry = ctk.CTkEntry(self.form_frame, placeholder_text="e.g. Blue Umbrella")
        self.name_entry.grid(row=0, column=1, padx=20, pady=10, sticky="ew")
        
        # Location
        loc_text = "Place Lost:" if mode == "lost" else "Location Found:"
        self.loc_label = ctk.CTkLabel(self.form_frame, text=loc_text)
        self.loc_label.grid(row=1, column=0, padx=20, pady=10, sticky="e")
        self.loc_entry = ctk.CTkEntry(self.form_frame, placeholder_text="e.g. Cafeteria")
        self.loc_entry.grid(row=1, column=1, padx=20, pady=10, sticky="ew")
        
        # Person
        p_text = "Reported By (Name):" if mode == "lost" else "Turned In By (Name):"
        self.p_label = ctk.CTkLabel(self.form_frame, text=p_text)
        self.p_label.grid(row=2, column=0, padx=20, pady=10, sticky="e")
        self.p_entry = ctk.CTkEntry(self.form_frame, placeholder_text="Your Name")
        self.p_entry.grid(row=2, column=1, padx=20, pady=10, sticky="ew")
        
        # Submit Button
        self.submit_btn = ctk.CTkButton(self, text="Submit Report", command=self.submit)
        self.submit_btn.grid(row=2, column=0, padx=20, pady=20)
        
        self.status_label = ctk.CTkLabel(self, text="", text_color="green")
        self.status_label.grid(row=3, column=0, padx=20, pady=5)

    def submit(self):
        name = self.name_entry.get()
        loc = self.loc_entry.get()
        person = self.p_entry.get()
        
        if not name or not loc:
            self.status_label.configure(text="Please fill in all required fields.", text_color="red")
            return
        
        curr_date = date.today().strftime('%Y-%m-%d')
        
        if self.mode == "lost":
            query = "INSERT INTO LostItems (item_name, date_lost, place_lost, reported_by) VALUES (%s, %s, %s, %s)"
        else:
            query = "INSERT INTO FoundItems (item_name, date_found, location_found, turned_in_by) VALUES (%s, %s, %s, %s)"
            
        result = self.db_helper.execute_query(query, (name, curr_date, loc, person))
        
        if result:
            self.status_label.configure(text="Report submitted successfully!", text_color="green")
            self.clear_fields()
        else:
            self.status_label.configure(text="Failed to submit report. Check DB connection.", text_color="red")

    def clear_fields(self):
        self.name_entry.delete(0, 'end')
        self.loc_entry.delete(0, 'end')
        self.p_entry.delete(0, 'end')
