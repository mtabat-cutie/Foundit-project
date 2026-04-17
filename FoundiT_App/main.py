import customtkinter as ctk
from src.database.db_helper import DBHelper
from src.views.dashboard import DashboardView
from src.views.report_view import ReportView
from src.views.browse_view import BrowseView

class FoundiTApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title("FoundiT - School Lost & Found System")
        self.geometry("1100x600")

        # Database Helper
        self.db_helper = DBHelper()
        self.db_helper.initialize_db()

        # set grid layout 1x2
        self.grid_rowconfigure(0, weight=1)
        self.grid_columnconfigure(1, weight=1)

        # load images with light and dark mode image
        image_path = os.path.join(os.path.dirname(os.path.realpath(__file__)), "assets")
        # Placeholder for logo if we had one
        # self.logo_image = ctk.CTkImage(Image.open(os.path.join(image_path, "logo.png")), size=(26, 26))

        # create navigation frame
        self.navigation_frame = ctk.CTkFrame(self, corner_radius=0)
        self.navigation_frame.grid(row=0, column=0, sticky="nsew")
        self.navigation_frame.grid_rowconfigure(5, weight=1)

        self.navigation_frame_label = ctk.CTkLabel(self.navigation_frame, text="  FoundiT",
                                                 compound="left", font=ctk.CTkFont(size=20, weight="bold"))
        self.navigation_frame_label.grid(row=0, column=0, padx=20, pady=20)

        self.home_button = ctk.CTkButton(self.navigation_frame, corner_radius=0, height=40, border_spacing=10, text="Dashboard",
                                        fg_color="transparent", text_color=("gray10", "gray90"), hover_color=("gray70", "gray30"),
                                        anchor="w", command=self.home_button_event)
        self.home_button.grid(row=1, column=0, sticky="ew")

        self.report_lost_button = ctk.CTkButton(self.navigation_frame, corner_radius=0, height=40, border_spacing=10, text="Report Lost Item",
                                               fg_color="transparent", text_color=("gray10", "gray90"), hover_color=("gray70", "gray30"),
                                               anchor="w", command=self.report_lost_button_event)
        self.report_lost_button.grid(row=2, column=0, sticky="ew")

        self.report_found_button = ctk.CTkButton(self.navigation_frame, corner_radius=0, height=40, border_spacing=10, text="Report Found Item",
                                                fg_color="transparent", text_color=("gray10", "gray90"), hover_color=("gray70", "gray30"),
                                                anchor="w", command=self.report_found_button_event)
        self.report_found_button.grid(row=3, column=0, sticky="ew")

        self.view_all_button = ctk.CTkButton(self.navigation_frame, corner_radius=0, height=40, border_spacing=10, text="Viewing Module",
                                            fg_color="transparent", text_color=("gray10", "gray90"), hover_color=("gray70", "gray30"),
                                            anchor="w", command=self.view_all_button_event)
        self.view_all_button.grid(row=4, column=0, sticky="ew")

        self.appearance_mode_menu = ctk.CTkOptionMenu(self.navigation_frame, values=["Dark", "Light", "System"],
                                                        command=self.change_appearance_mode_event)
        self.appearance_mode_menu.grid(row=6, column=0, padx=20, pady=20, sticky="s")

        # create frames for different views
        self.home_frame = DashboardView(self, self.db_helper, corner_radius=0, fg_color="transparent")
        self.report_lost_frame = ReportView(self, self.db_helper, mode="lost", corner_radius=0, fg_color="transparent")
        self.report_found_frame = ReportView(self, self.db_helper, mode="found", corner_radius=0, fg_color="transparent")
        self.view_all_frame = BrowseView(self, self.db_helper, corner_radius=0, fg_color="transparent")

        # select default frame
        self.select_frame_by_name("home")

    def select_frame_by_name(self, name):
        # set button color for selected button
        self.home_button.configure(fg_color=("gray75", "gray25") if name == "home" else "transparent")
        self.report_lost_button.configure(fg_color=("gray75", "gray25") if name == "lost" else "transparent")
        self.report_found_button.configure(fg_color=("gray75", "gray25") if name == "found" else "transparent")
        self.view_all_button.configure(fg_color=("gray75", "gray25") if name == "view" else "transparent")

        # show selected frame
        if name == "home":
            self.home_frame.grid(row=0, column=1, sticky="nsew")
        else:
            self.home_frame.grid_forget()
        if name == "lost":
            self.report_lost_frame.grid(row=0, column=1, sticky="nsew")
        else:
            self.report_lost_frame.grid_forget()
        if name == "found":
            self.report_found_frame.grid(row=0, column=1, sticky="nsew")
        else:
            self.report_found_frame.grid_forget()
        if name == "view":
            self.view_all_frame.grid(row=0, column=1, sticky="nsew")
        else:
            self.view_all_frame.grid_forget()

    def home_button_event(self):
        self.home_frame.refresh()
        self.select_frame_by_name("home")

    def report_lost_button_event(self):
        self.select_frame_by_name("lost")

    def report_found_button_event(self):
        self.select_frame_by_name("found")

    def view_all_button_event(self):
        self.view_all_frame.refresh()
        self.select_frame_by_name("view")

    def change_appearance_mode_event(self, new_appearance_mode):
        ctk.set_appearance_mode(new_appearance_mode)

if __name__ == "__main__":
    app = FoundiTApp()
    app.mainloop()
