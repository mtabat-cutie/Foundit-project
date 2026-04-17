from dataclasses import dataclass
from datetime import date

@dataclass
class LostItem:
    item_name: str
    date_lost: date
    place_lost: str
    reported_by: str = None
    id: int = None

@dataclass
class FoundItem:
    item_name: str
    date_found: date
    location_found: str
    turned_in_by: str = None
    id: int = None

@dataclass
class User:
    name: str
    user_id: int = None
