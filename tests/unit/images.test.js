const assert = require('chai').assert;
const Image = require('../../lib/models/images');

describe('Image model', () => {

  it('validates with required fields', () => {
    const image = new Image({
      url: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/grinning-face_1f600.png',
      title: 'grinning face',
      description: 'yellow smiley'
    });

    return image.validate();

  });

  it('validation fails without required fields', () => {
    const image = new Image();

    return image.validate()
      .then(
        () => { throw new Error('expected data validation error'); },
        ({ errors }) => {
          assert.ok(errors.url);
          assert.ok(errors.title);
          assert.ok(errors.description);
        }
      );
  });

});
