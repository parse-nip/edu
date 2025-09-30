import { WebContainer } from '@webcontainer/api';
import { WORK_DIR_NAME } from '@/utils/constants';

interface WebContainerContext {
  loaded: boolean;
}

export const webcontainerContext: WebContainerContext = {
  loaded: false,
};

export let webcontainer: Promise<WebContainer> = new Promise(() => {
  // noop for ssr
});

if (typeof window !== 'undefined') {
  webcontainer = Promise.resolve()
    .then(() => {
      return WebContainer.boot({ workdirName: WORK_DIR_NAME });
    })
    .then((webcontainer) => {
      webcontainerContext.loaded = true;
      return webcontainer;
    });
}
