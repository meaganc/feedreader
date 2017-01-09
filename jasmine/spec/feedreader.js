/* feedreader.js
*
* This is the spec file that Jasmine will read and contains
* all of the tests that will be run against your application.
*/

/* We're placing all of our tests within the $() function,
* since some of these tests may require DOM elements. We want
* to ensure they don't run until the DOM is ready.
*/
$(function() {
  /* This is our first test suite - a test suite just contains
  * a related set of tests. This suite is all about the RSS
  * feeds definitions, the allFeeds variable in our application.
  */
  describe('RSS Feeds', function() {
    /* This is our first test - it tests to make sure that the
    * allFeeds variable has been defined and that it is not
    * empty. Experiment with this before you get started on
    * the rest of this project. What happens when you change
    * allFeeds in app.js to be an empty array and refresh the
    * page?
    */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });

    // This test ensures that each feed is defined
    it('each feed is defined', function(){
      allFeeds.forEach(function(feed){
        expect(feed).toBeDefined();
        expect(feed.url).toBeDefined();
        expect(feed.url).not.toBe(null);
      });
    });

    // This test ensures that each feed has a name
    it('has a name on every feed', function(){
      allFeeds.forEach(function(feed){
        expect(feed.name).toBeDefined();
        expect(feed.name).not.toBe(null);
      });
    });
  });


  describe("the menu", function(){
    // This test ensures that the menu is hidden by default

    it('is hidden by default', function(){
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });

    // This test ensures that the menu is shown and then hidden
    it('can be shown and hidden', function(){
      var menuLink = $('.menu-icon-link');

      menuLink.trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(false);
      menuLink.trigger('click');
      expect($('body').hasClass('menu-hidden')).toBe(true);
    });
  });

  describe('Initial Entries', function(){
    // This test ensures that first feed is loaded and the feed has entries
    beforeEach(function(done){
      loadFeed(0, function(){
        done();
      });
    });

    it('displays the entries on load', function(done){
      expect($('.feed').children().length).not.toBe(0);
      expect($('.entry').length).not.toBe(0);
      done();
    });
  });

  describe('New Feed selection', function(){
    /* This test ensures that first feed is loaded and the feed has entries,
    * then loads the next feed. It compares this to the first feed,
    * makes sure they are different, and then re-loads the first feed
    * to make sure it is the same
    */

    var firstFeed,
    firstHeader,
    secondFeed,
    secondHeader;

    beforeEach(function(done){
      loadFeed(0, function(){
        firstFeed = $('.feed').html();
        firstHeader = $('.feed .entry h2')[0];
        loadFeed(1, function(){
          secondFeed = $('.feed').html();
          secondHeader = $('.feed .entry h2')[0];
          loadFeed(0, function(){
            done();
          });
        });
      });
    });

    it('has different content when new feed loads', function(done){
      expect($('.feed').html()).toBe(firstFeed);
      expect($('.feed .entry h2')[0]).not.toBe(firstHeader);
      expect(secondFeed).not.toBe(firstFeed);
      expect(secondHeader).not.toBe(firstHeader);
      done();
    });
  });
}());
