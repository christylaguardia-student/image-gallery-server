const assert = require('chai').assert;
const db = require('./_db');
const request = require('./_request');

describe('Image api', () => {

  beforeEach(db.drop);

  function save(img) {
    return request
      .post('/api/images/')
      .send(img)
      .then(res => res.body);
  }

  it('saves an image', () => {
    const newImg = {
      title: 'fire',
      description: 'Fire is the rapid oxidation of a material in the exothermic chemical process of combustion, releasing heat, light, and various reaction products. Slower oxidative processes like rusting or digestion are not included by this definition.',
      url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/fire_1f525.png'
    };

    return save(newImg)
      .then(savedImg => {
        assert.ok(savedImg._id);
        assert.deepEqual(savedImg.title, newImg.title);
        assert.deepEqual(savedImg.description, newImg.description);
        assert.deepEqual(savedImg.url, newImg.url);
      });

  });

  it('gets all images', () => {
    let newImages = [
      {
        title: 'alien',
        description: 'Extraterrestrial life, also called alien life (or, if it is a sentient or relatively complex individual, an "extraterrestrial" or "alien"), is life that does not originate from Earth. These hypothetical life forms may range from simple single-celled organisms to beings with civilizations far more advanced than humanity. Although many scientists expect extraterrestrial life to exist in some form, there is no evidence for its existence to date. The Drake equation speculates about the existence of intelligent life elsewhere in the universe. The science of extraterrestrial life in all its forms is known as exobiology.',
        url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/alien-monster_1f47e.png'
      },{
        title: 'nerd',
        description: 'A nerd is a person seen as overly intellectual, obsessive, or lacking social skills. Such a person may spend inordinate amounts of time on unpopular, little known, or non-mainstream activities, which are generally either highly technical, abstract, or relating to topics of fiction or fantasy, to the exclusion of more mainstream activities. Additionally, many so-called nerds are described as being shy, quirky, pedantic, and unattractive, and may have difficulty participating in, or even following, sports.',
        url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/nerd-face_1f913.png'
      }
    ];

    return Promise.all(newImages.map(save))
      .then(saved => newImages = saved)
      .then(() => request.get('/api/images'))
      .then(res => {
        const found = res.body.sort((a,b) => a._id > b._id ? 1 : -1);
        // console.log('found', found);
        assert.deepEqual(found, newImages);
      });

  });

});