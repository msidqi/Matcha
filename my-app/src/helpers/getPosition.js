export default function getPosition() {
    return new Promise((resolve, reject) => {
    if (!navigator.geolocation)
      throw 'Geolocation not supported.';
    else
      navigator.geolocation.getCurrentPosition(resolve, reject);
    })
  };