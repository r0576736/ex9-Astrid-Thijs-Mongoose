# ex9-Astrid-Thijs-Mongoose

Via de anderen ben ik ook begonnen via mongoose, ik heb met behulp van de code van Jelle Van Loock, mijn api hierin gemaakt. 
Als je wil zien wat ik hiervoor had, kijk dan naar repository ex9-Astrid-Thijs, deze oefening lukte hier niet helemaal, daarom ben ik naar mongoose overgeschakelt.

ValidatieDevices
  Hier staat de validatie in van de data. Deze velden mogen niet leeg zijn en het type van data moet juist zijn, anders error.
  
ValidatieAlarms
  Hier staat de validatie in van de data. Deze velden mogen niet leeg zijn en het type van data moet juist zijn, anders error.
  
ValidatieWhiteLists
  Hier staat de validatie in van de data. Deze velden mogen niet leeg zijn en het type van data moet juist zijn, anders error.
  
StorageDevices
  Hierin is het 'Devices' schema voor mongoose verwerkt. 
    SaveDevice= Toestel opslagen
    AllDevices= Alle toestellen opvragen
    findDevice= een bepaald toestel opzoeken

StorageAlarms
  Hierin is het 'Alarms' schema voor mongoose verwerkt. 
    SaveAlarm= alarm opslagen
    AllAlarms= lijst met alarmen opvragen
    findAlarm= een bepaald alarm opzoeken

StorageWhiteLists
  Hierin is het 'WhiteLists' schema van mongoose verwerkt. 
    SaveWhiteList= record opslagen
    AllWhiteLists= Alle records opvragen
    findWhiteList= een bepaald record opzoeken

Main:
  Alle nodige extenties installeren (express, body-parser, mongoose).
  Connecteren met mongodb.
  Validaties toevoegen, alsook de Storages.
  Methodes implementeren: GET; GET/:id; POST; (PUT) in alle Resources.
  app.listen= server starten op http://localhost:12345
  via console.log even checken of het werkt.
  
  
  

