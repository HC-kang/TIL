let person = {
  _bloodTypeList: ['A', 'B', 'O', 'AB'],
  _bloodType: 'A',

  set bloodType(type) {
    if (this._bloodTypeList.includes(type)) {
      this._bloodType = type;
    }
  },

  get bloodType() {
    return this._bloodType;
  },
};

console.log(person.bloodType);
person.bloodType = 'AB'; // 의도된 변경
console.log(person.bloodType);
person.bloodType = 'C'; // 의도된 변경금지
console.log(person.bloodType);
person._bloodType = 'C'; // 의도하지 않은 변경
console.log(person.bloodType);

// ---------------------------------------------

function makePerson() {
  let _bloodTypeList = ['A', 'B', 'O', 'AB'];
  let _bloodType = 'A';

  return {
    set bloodTypeList(type) {
      if (_bloodTypeList.includes(type)) {
        _bloodType = type;
      }
    },

    get bloodType() {
      return _bloodType;
    },
  };
}

let person2 = makePerson();

console.log(person2.bloodType);
person2.bloodType = 'AB'; // 의도된 변경
console.log(person2.bloodType);
person2.bloodType = 'C'; // 의도된 변경금지
console.log(person2.bloodType);
person2._bloodType = 'C'; // 의도된 변경금지
console.log(person2.bloodType);
