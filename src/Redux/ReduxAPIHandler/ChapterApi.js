import RequestManager from '../../ApiManger';
import api from '../../Resources/APIs';

export async function chapterApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.GET_CHAPTER,
      {course_id: data.id},
      header,
    )
      .then(async (response) => {
        console.log('error', response.response);
        let chapter = setChapterData(response.response);
        resolve(chapter);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}
async function setChapterData(response) {
  let data = {
    id: response.user_id,
    chapters:
      response.chapters.lenght == 0 || response.chapters == undefined
        ? []
        : response.chapters,
    course_image: response.course_image,
    course_name: response.course_name,
    success: response.success,
    user_name: response.user_name,
    purchase: response.purchase,
    course_price: response.course_price,
    feedback: response.feedback == undefined ? [] : response.feedback,
    course_des: response.course_description,
    total_cards: response.total_cards,
    deck_cards: response.deck_cards,
    total_purchases: response.total_purchases,
    average_rating: response.average_rating,
  };
  return data;
}
// ADD Chapter
export async function addChapterApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.ADD_CHAPTER,
      {
        course_id: data.course_id,
        id: data.id,
        chapter_name: data.chapter_name,
        chapter_description: data.desc,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}

// UPDATE Chapter
export async function updateChapterApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.UPDATE_CHAPTER,
      {
        course_id: data.course_id,
        user_id: data.id,
        chapter_id: data.chapter_id,
        chapter_name: data.chapter_name,
        chapter_description: data.chapter_description,
      },
      header,
    )
      .then(async (response) => {
        resolve(response);
      })
      .catch(function (error) {
        console.log('error', error);
        reject(error.message);
      });
  });
}
