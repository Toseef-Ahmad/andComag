import {
  defaultDirection,
  defaultLocale,
  defaultColor,
  localeOptions,
  themeColorStorageKey,
  themeRadiusStorageKey,
} from 'constants/defaultValues';

import { database } from 'helpers/Firebase'

export const mapOrder = (array, order, key) => {
  // eslint-disable-next-line func-names
  array.sort(function (a, b) {
    const A = a[key];
    const B = b[key];
    if (order.indexOf(`${A}`) > order.indexOf(`${B}`)) {
      return 1;
    }
    return -1;
  });
  return array;
};

export const getDateWithFormat = () => {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!

  const yyyy = today.getFullYear();
  if (dd < 10) {
    dd = `0${dd}`;
  }
  if (mm < 10) {
    mm = `0${mm}`;
  }
  return `${dd}.${mm}.${yyyy}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  return `${now.getHours()}:${now.getMinutes()}`;
};

export const getDirection = () => {
  let direction = defaultDirection;

  try {
    if (localStorage.getItem('direction')) {
      const localValue = localStorage.getItem('direction');
      if (localValue === 'rtl' || localValue === 'ltr') {
        direction = localValue;
      }
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getDirection -> error', error);
    direction = defaultDirection;
  }
  return {
    direction,
    isRtl: direction === 'rtl',
  };
};
export const setDirection = (localValue) => {
  let direction = 'ltr';
  if (localValue === 'rtl' || localValue === 'ltr') {
    direction = localValue;
  }
  try {
    localStorage.setItem('direction', direction);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setDirection -> error', error);
  }
};

export const getCurrentColor = () => {
  let currentColor = defaultColor;
  try {
    if (localStorage.getItem(themeColorStorageKey)) {
      currentColor = localStorage.getItem(themeColorStorageKey);
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : getCurrentColor -> error', error);
    currentColor = defaultColor;
  }
  return currentColor;
};

export const setCurrentColor = (color) => {
  try {
    localStorage.setItem(themeColorStorageKey, color);
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentColor -> error', error);
  }
};

export const getCurrentRadius = () => {
  let currentRadius = 'rounded';
  try {
    if (localStorage.getItem(themeRadiusStorageKey)) {
      currentRadius = localStorage.getItem(themeRadiusStorageKey);
    }
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentRadius -> error',
      error
    );
    currentRadius = 'rounded';
  }
  return currentRadius;
};
export const setCurrentRadius = (radius) => {
  try {
    localStorage.setItem(themeRadiusStorageKey, radius);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentRadius -> error',
      error
    );
  }
};

export const getCurrentLanguage = () => {
  let language = defaultLocale;
  try {
    language =
      localStorage.getItem('currentLanguage') &&
        localeOptions.filter(
          (x) => x.id === localStorage.getItem('currentLanguage')
        ).length > 0
        ? localStorage.getItem('currentLanguage')
        : defaultLocale;
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : getCurrentLanguage -> error',
      error
    );
    language = defaultLocale;
  }
  return language;
};
export const setCurrentLanguage = (locale) => {
  try {
    localStorage.setItem('currentLanguage', locale);
  } catch (error) {
    console.log(
      '>>>>: src/helpers/Utils.js : setCurrentLanguage -> error',
      error
    );
  }
};

export const getCurrentUser = () => {
  let user = null;
  try {
    user =
      localStorage.getItem('gogo_current_user') != null
        ? JSON.parse(localStorage.getItem('gogo_current_user'))
        : null;
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js  : getCurrentUser -> error', error);
    user = null;
  }
  return user;
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem('gogo_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('gogo_current_user');
    }
  } catch (error) {
    console.log('>>>>: src/helpers/Utils.js : setCurrentUser -> error', error);
  }
};

/// sorting table
const createObj = (address, arr, numberOrString = false) => {
  // console.log(address, ' address');
  Object.byString = function (o, s) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    var a = s.split('.');
    for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }
  const obj = {}
  let tempObj = {};
  for (let i = 0; i < arr.length; i++) {
    tempObj = arr[i];
    if (!numberOrString) {

      obj[Object.byString(tempObj, address).toUpperCase() + i] = { ...arr[i] }
    } else {
      obj[`${Object.byString(tempObj, address)  } ${  i}`] = { ...arr[i] }
    }
  }
  // console.log(obj, ' sorted arr')
  return obj;

  // const objAddress = "group.name";
  // switch (sortBy) {
  //   case 'groupName': {
  //     // for (let i = 0; i < arr.length; i++) {
  //     //   obj[arr[i].group.name.toUpperCase() + i] = { ...arr[i] }
  //     // }
  //     for (let i = 0; i < arr.length; i++) {
  //       tempObj = arr[i];
  //       obj[Object.byString(tempObj, objAddress).toUpperCase() + i] = { ...arr[i] }
  //     }
  //   }
  //     break;
  //   case 'groupId':
  //     for (let i = 0; i < arr.length; i++) {
  //       obj[arr[i].group.groupCode.toUpperCase() + i] = { ...arr[i] }
  //     }
  //     break;
  //   case 'creationDate':
  //     for (let i = 0; i < arr.length; i++) {
  //       obj[arr[i].group.createdAt.toUpperCase() + i] = { ...arr[i] }
  //     }
  //     break;
  //   case 'accountType':
  //     for (let i = 0; i < arr.length; i++) {
  //       obj[arr[i].group.type.toUpperCase() + i] = { ...arr[i] }
  //     }
  //     break;
  //   case 'userCount':
  //     for (let i = 0; i < arr.length; i++) {
  //       obj[arr[i].group.groupUsers + ' ' + i] = { ...arr[i] }
  //     }
  //     break;
  //   case 'status':
  //     for (let i = 0; i < arr.length; i++) {
  //       obj[arr[i].group.subscriptionStatus + i] = { ...arr[i] }
  //     }
  //     break;
  // }

  // return obj;
}

export const sortTable = (sortBy, arr) => {
  console.log(arr, '   nursing insire sortTable function')
  let temObj = {};
  // eslint-disable-next-line default-case
  switch (sortBy) {
    case 'groupId':
      temObj = createObj('group.groupCode', arr);
      break;
    case 'groupName':
      temObj = createObj('group.name', arr);
      break;
    case 'creationDate':
      if (arr[0].group.createAt) {
        temObj = createObj('group.createdAt', arr);
      } else {
        temObj = createObj('createdAt', arr);
      }

      break;
    case 'accountType':
      return arr;
    case 'userCount':
      temObj = createObj('group.groupUsers', arr, true);
      break;
    case 'status':
      temObj = createObj('group.subscriptionStatus', arr, true);
      break;
    case 'periodStart':
      temObj = createObj('magazine.startDate', arr, true);
      break;
    case 'periodEnd':
      temObj = createObj('magazine.endDate', arr);
      break;
    case 'magzineId':
      temObj = createObj('magazine.edition', arr, true);
      break;
    case 'numberOfPosts':
      temObj = createObj('magazine.postsCount', arr, true);
      break;
  }
  // console.clear();
  // const temObj = createObj(sortBy, arr);

  const ordered = Object.keys(temObj).sort().reduce(
    (obj, key) => {
      obj[key] = temObj[key];
      return obj;
    },
    {}
  );
  const sortedArr = [];
  for (const key in ordered) {
    sortedArr.push(ordered[key]);
  }
  // console.log(sortedArr, ' of nursing group table')
  return sortedArr;
}


// its all about average of posts inside magazine which will display on table
export const calAverage = (tableObj) => {
  // console.log(tableObj, ' table obj in calAverage');
  let currentId = tableObj[0].group.groupCode;
  let posts = 0;
  let magazines = 0;
  let average = 0;
  const checkedIdes = new Set();
  const idArr = [];
  // let firstTime = true;
  for (let j = 0; j < tableObj.length; j++) {
    currentId = 'group' in tableObj[j] && tableObj[j].group.groupCode; // "9zaw7"
    if (!checkedIdes.has(currentId)) {
      checkedIdes.add(currentId); // ["9zaw7"]
      for (let i = 0; i < tableObj.length; i++) {

        if ('group' in tableObj[i] && tableObj[i].group.groupCode === currentId) {

          posts += tableObj[i].magazine.postsCount;

          magazines += 1;
        }
      }
      average = posts / magazines;

      tableObj[j].average = average;
      // console.log(average, posts);
      average = 0;
      posts = 0;
      magazines = 0;
    }
  }
  // console.log(tableObj, ' table');
  removeDuplication(tableObj);
}


export const removeDuplication = (arr) => {

  const pureArr = arr.filter(table => table.average ? table : '');
  // console.log(pureArr, ' pure array');
  // console.log(arr);
  arr.length = 0;
  arr.push(...pureArr);
  return pureArr;
}

export const removeDuplicationTableRows = (arr) => {
  const storeUniqueValue = new Set();
  const pureTable = [];
  for(let group of arr) {
    if (!storeUniqueValue.has(group.group.groupCode)) {
      storeUniqueValue.add(group.group.groupCode);
      pureTable.push(group);
    }
  }
  // arr.length = 0;
  // arr.push(...pureTable);
  // console.log(pureTable)
  return pureTable;
}

// its all about getting user age average in nursing home account

export const getAverage = (groups) => {
  // eslint-disable-next-line no-use-before-define
  getAverageUsersAge(groups);
  let usersBirthDays = 0;
  let nursingHomeUsers = 0;
  const currentYear = new Date().getFullYear();
  // console.log(group.users[0].birthday)
  for (let group of groups) {
    if (group.info.type !== "family") {
      // console.log(group)
      for (let user in group.users) {
        if (group.users[user].birthday) {
          usersBirthDays += currentYear - new Date(group.users[user]?.birthday).getFullYear();
          nursingHomeUsers++;
        }
      }
    }
  }
  return usersBirthDays / nursingHomeUsers;
}


// its all about getting average of users posts

export const getAveragePosts = (magazines, monthOrYear) => {
  let totalNumberOfPosts = 0;
  const currentUser = new Set();
  const lastMonth = new Date().getMonth() - 1;
  const currentYear = new Date().getFullYear();

  const gettingPosts = (magazine) => {
    switch (monthOrYear) {
      case 'month':
        return new Date(magazine.endDate.split('-')[1]).getMonth() === lastMonth;
      case 'year':
        return new Date(magazine.endDate.split('-')[0]).getFullYear() === currentYear;
    }
  }

  for (let magazine of magazines) {
    if (magazine.posts && gettingPosts(magazine)) {
      totalNumberOfPosts += Object.keys(magazine.posts).length;
      for (let post in magazine.posts) {
        currentUser.add(magazine.posts[post].user.name);
      }
    }
  }
  return Math.floor((totalNumberOfPosts / currentUser.size));
}



export const getAveragePostsCurrentYear = (magazines) => {
  let totalNumberOfPosts = 0;
  const currentUser = new Set();
  const currentYear = new Date().getFullYear();

  for (let magazine of magazines) {
    if (magazine.posts && new Date(magazine.endDate.split('-')[0]).getFullYear() === currentYear) {
      totalNumberOfPosts += Object.keys(magazine.posts).length;
      for (let post in magazine.posts) {
        // console.log(magazine.posts[post].user)
        currentUser.add(magazine.posts[post].user.name);
      }
    }
  }
  return Math.floor((totalNumberOfPosts / currentUser.size));
}


const calTotalNumberOfUsers = (magazines) => {
  const allUsers = new Set();
  for (let magazine of magazines) {
    if (magazine.posts) {
      for (let post in magazine.posts) {
        // console.log(magazine.posts[post].user)
        allUsers.add(magazine.posts[post].user.name);
      }
    }
  }
  // console.log(allUsers.size, ' usersList')
  return allUsers.size;
}
export const getAverageGroups = (numberOfGroups, magazines) => {
  return Math.floor(numberOfGroups.length / calTotalNumberOfUsers(magazines));
}

// its all about counting nursing home account subscriber
export const getNursinghomeSubscriber = (groups) => {
  let totalNumbrOfNursingHome = 0;
  for (let group of groups) {
    group.info.type !== 'family' && totalNumbrOfNursingHome++;
  }
  // console.log('Nursing home', totalNumbrOfNursingHome)
  return totalNumbrOfNursingHome;
}



// all about family group

export const getFamilyActiveAccounts = (groups) => {
  const totalActiveFamilyAccount = 0;
  for (let group of groups) {
    group.info.type === 'family' && group.info.subscriptionStatus && totalActiveFamilyAccount++;
  }
  return totalActiveFamilyAccount;
}

export const getFamilyClosedAccounts = (groups) => {
  const totalClosedFamilyAccount = 0;
  for (let group of groups) {
    group.info.type === 'family' && !group.info.subscriptionStatus && totalClosedFamilyAccount++;
  }
}

export const getAverageUserPerGroup = (groups) => {

  let totalNumerOfGroups = 0;
  let totalUsers = 0;
  // const totalUsers = 0;

  for (let group of groups) {
    if (group.users) {
      totalUsers += Object.keys(group.users).length;
    }
  }
  console.log(totalUsers, '  total users...')
  // console.log((totalUsers / groups.length), ' its my');
  // // console.log(groups
  //   .map((elem) =>
  //     elem.users ? Object.keys(elem.users).length : 0
  //   )
  //   .reduce((acc, post) => acc + post) / groups.length
  // )
}

// its all about getting users average age
export const getAverageUsersAge = (groups) => {

  let usersBirthDays = 0;
  let nursingHomeUsers = 0;
  const currentYear = new Date().getFullYear();

  for (let group of groups) {

      for (let user in group.users) {
        if (group.users[user].birthday) {
          usersBirthDays += currentYear - new Date(group.users[user]?.birthday).getFullYear();
          nursingHomeUsers++;
        }
    }
  }
  return Math.floor(usersBirthDays / nursingHomeUsers);
}