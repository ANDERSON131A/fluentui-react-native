import { STROKEWIDTH_TESTPAGE, HOMEPAGE_STROKEWIDTH_BUTTON } from '../consts';
import { BasePage } from '../../common/BasePage';

class StrokeWidthTokensPageObject extends BasePage {
  /*****************************************/
  /**************** Getters ****************/
  /*****************************************/
  get _pageName() {
    return STROKEWIDTH_TESTPAGE;
  }

  get _pageButtonName() {
    return HOMEPAGE_STROKEWIDTH_BUTTON;
  }
}

export default new StrokeWidthTokensPageObject();
