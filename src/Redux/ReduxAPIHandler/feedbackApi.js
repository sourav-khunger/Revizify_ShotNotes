import RequestManager from '../../ApiManger';
import api from '../../Resources/APIs';

export async function userFeedbackApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.USER_FEEDBACK,
      {
        feedback_to_user_id: data.id,
        feedback_message: data.feedback,
        feedback_rating: data.rating,
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

export async function courseFeedbackApi(data) {
  return await new Promise(async function (resolve, reject) {
    let header = {
      Authorization: data.token != '' ? 'Bearer ' + data.token : '',
      'Content-Type': 'application/json',
      Accept: 'application/json',
    };

    await RequestManager.postRequest(
      api.COURSE_FEEDBACK,
      {
        feedback_course_id: data.courseId,
        feedback_to_user_id: data.id,
        feedback_message: data.feedback,
        feedback_rating: data.rating,
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
