const Note = artifacts.require("Note");

contract("Note", accounts => {
  let noteInstance;

  before(async () => {
    noteInstance = await Note.new();
  });

  it("should add a new note", async () => {
    const baslik = "Başlık";
    const icerik = "İçerik";

    const result = await noteInstance.notEkle(baslik, icerik);

    const notEklendiEvent = result.logs[0];
    assert.equal(notEklendiEvent.event, "NotEklendi", "NotEklendi event should be emitted");
    assert.equal(notEklendiEvent.args.notId, 1, "Incorrect note ID");
    assert.equal(notEklendiEvent.args.baslik, baslik, "Incorrect note title");
    assert.equal(notEklendiEvent.args.icerik, icerik, "Incorrect note content");
  });

  it("should update an existing note", async () => {
    const baslik = "Yeni Başlık";
    const icerik = "Yeni İçerik";

    const result = await noteInstance.notGuncelle(1, baslik, icerik);

    const notGuncellendiEvent = result.logs[0];
    assert.equal(notGuncellendiEvent.event, "NotGuncellendi", "NotGuncellendi event should be emitted");
    assert.equal(notGuncellendiEvent.args.notId, 1, "Incorrect note ID");
    assert.equal(notGuncellendiEvent.args.baslik, baslik, "Incorrect note title");
    assert.equal(notGuncellendiEvent.args.icerik, icerik, "Incorrect note content");
  });

  it("should delete an existing note", async () => {
    const result = await noteInstance.notSil(1);

    const notSilindiEvent = result.logs[0];
    assert.equal(notSilindiEvent.event, "NotSilindi", "NotSilindi event should be emitted");
    assert.equal(notSilindiEvent.args.notId, 1, "Incorrect note ID");
  });

  it("should retrieve an existing note", async () => {
    const baslik = "Başlik";
    const icerik = "İçerik";
  
    // Add a new note
    await noteInstance.notEkle(baslik, icerik);
  
    // Retrieve the note
    const result = await noteInstance.notGetir(1);
  
    // Compare the retrieved title with the expected title
    assert.equal(result[0], baslik, "Incorrect note title");
    assert.equal(result[1], icerik, "Incorrect note content");
  });
  
});
