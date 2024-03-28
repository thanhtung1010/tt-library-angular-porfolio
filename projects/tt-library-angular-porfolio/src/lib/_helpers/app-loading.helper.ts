export class AppLoadingHelper {
  public static Toggle(enable: boolean) {
      const loading = document.querySelector('#main-loading');
      if (loading) {
          if (enable) {
              loading.setAttribute('style', 'display: flex');
          } else {
              loading.setAttribute('style', 'display: none');
          }
      }
  }
  public static SetText(text: string) {
      const loading = document.getElementsByClassName('main-loading-text');
      if (loading[0] !== undefined) {
          loading[0].textContent = text;
      }
  }
}
