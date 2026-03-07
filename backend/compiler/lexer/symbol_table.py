class Symbol_Table:
    def __init__(self):
        self.rows = {}


    # Insert new row
    def insert(self, row_id, data):
        if row_id in self.rows:
            print("Row ID already exists")
        else:
            self.rows[row_id] = data

    # Get row by ID
    def get_row(self, row_id):
        return self.rows.get(row_id, "Row not found")

    # Update column value
    def update(self, row_id, column, value):
        if row_id in self.rows:
            self.rows[row_id][column] = value
        else:
            print("Row not found")

    # Delete row
    def delete(self, row_id):
        if row_id in self.rows:
            del self.rows[row_id]
        else:
            print("Row not found")

    # Search rows by column value
    def search(self, column, value):
        result = []
        for row_id, data in self.rows.items():
            if column in data and data[column] == value:
                result.append((row_id, data))
        return result

    # Display entire table
    def display(self):
        for row_id, data in self.rows.items():
            print(f"{row_id} -> {data}")

######################################################################
# Example usage

# table = Symbol_Table()

# table.insert(1, {"name": "Parth", "age": 20, "city": "Dehradun"})
# table.insert(2, {"name": "Aman", "age": 21, "city": "Delhi"})
# table.insert(3, {"name": "Riya", "age": 19, "city": "Mumbai"})

# print("Row 1:", table.get_row(1))

# table.update(1, "age", 22)

# table.delete(3)

# print("Search:", table.search("city", "Delhi"))

# table.display()