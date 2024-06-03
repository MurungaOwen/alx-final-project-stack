import http.client
import json



class ExerciseAPI:
    def __init__(self):
        self.conn = http.client.HTTPSConnection("exercisedb.p.rapidapi.com")
        self.headers = {
            'X-RapidAPI-Key': "4f29af3280msh23b2e89045c733dp191baajsne20fd121c3f9",
            'X-RapidAPI-Host': "exercisedb.p.rapidapi.com"
        }

    def get_body_part_list(self):
        self.conn.request("GET", "/exercises/bodyPartList", headers=self.headers)
        res = self.conn.getresponse()
        data = res.read()
        
        return json.loads(data.decode("utf-8"))

    def get_body_part_exercises(self, body_part, limit=15):
        
        body_parts = self.get_body_part_list()
        
        # Check if body_parts is not None
        if body_parts is None:
            return {"error": "Failed to fetch body part list"}
        
        # Check if the provided body_part is in the list of available body parts
        if body_part not in body_parts:
            # If not, return an error message
            return {"error": f"Invalid body part: {body_part}. Allowed values: {', '.join(body_parts)}"}
        
        endpoint = f"/exercises/bodyPart/{body_part}?limit={limit}"
        self.conn.request("GET", endpoint, headers=self.headers)
        res = self.conn.getresponse()
        data = res.read()
        # Return data in JSON format
        return json.loads(data.decode("utf-8"))


    