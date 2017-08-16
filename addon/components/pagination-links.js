import Ember from 'ember';
import layout from '../templates/components/pagination-links';

export default Ember.Component.extend({

  layout,

  currentPage: 1,

  lastPage: 1,

  firstPageIcon: '«',
  prevPageIcon: '‹',
  nextPageIcon: '›',
  lastPageIcon: '»',

  showFirstAndLast: false,

  width: 10,

  /**
   * Whether the 'previous page' button should be disabled.
   */
  prevDisabled: Ember.computed('currentPage', function () {
    return Ember.get(this, 'currentPage') === 1;
  }),

  /**
   * Whether the 'next page' button should be disabled.
   */
  nextDisabled: Ember.computed('currentPage', 'lastPage', function () {
    return Ember.get(this, 'currentPage') === Ember.get(this, 'lastPage');
  }),

  /**
   * Whether the 'first page' button should be disabled.
   */
  firstDisabled: Ember.computed('currentPage', 'showFirstAndLast', function () {
    const shouldUse = Ember.get(this, 'showFirstAndLast');
    const onFirst = Ember.get(this, 'currentPage') === 1;
    return onFirst || !shouldUse;
  }),

  /**
   * Whether the 'last page' button should be disabled.
   */
  lastDisabled: Ember.computed('currentPage', 'showFirstAndLast', 'lastPage', function () {
    const lastPage = Ember.get(this, 'lastPage');
    if (!lastPage) {
      return true;
    }

    const shouldUse = Ember.get(this, 'showFirstAndLast');
    const onLast = Ember.get(this, 'currentPage') === lastPage;
    return onLast || !shouldUse;
  }),

  /**
   * The first page number to display as a link.
   */
  listStartPage: Ember.computed('currentPage', 'width', 'lastPage', function () {
    const width = Ember.get(this, 'width');
    const lastPage = Ember.get(this, 'lastPage');
    // If the entire desired width fits regardless of the current page,
    // then always start on page 1.
    if (lastPage - width <= 0) {
      return 1;
    }

    const currentPage = Ember.get(this, 'currentPage');

    return Math.max(1, currentPage - Math.ceil(width / 2));
  }),

  /**
   * The last page number to display as a link.
   */
  listEndPage: Ember.computed('listStartPage', 'width', 'lastPage', function () {
    const listStartPage = Ember.get(this, 'listStartPage');
    const width = Ember.get(this, 'width');
    const lastPage = Ember.get(this, 'lastPage');

    return Math.min(listStartPage + width - 1, lastPage);
  }),

  /**
   * List of page numbers to show before the current one.
   */
  pagesBeforeCurrent: Ember.computed('listStartPage', 'currentPage', function () {
    const listStartPage = Ember.get(this, 'listStartPage');
    const currentPage = Ember.get(this, 'currentPage');

    return this.range(listStartPage, currentPage - 1);
  }),

  /**
   * List of page numbers to show after the current one.
   */
  pagesAfterCurrent: Ember.computed('currentPage', 'listEndPage', function () {
    const currentPage = Ember.get(this, 'currentPage');
    const listEndPage = Ember.get(this, 'listEndPage');

    return this.range(currentPage + 1, listEndPage);
  }),


  /**
   * Create an array containing a sequence of integers.
   */
  range (start, finish) {
    const range = [];
    for (let i = start; i <= finish; i++) {
      range.push(i);
    }

    return range;
  }

});
