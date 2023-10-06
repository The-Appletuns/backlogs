using NUnit.Framework;
using HomePage.Services;

namespace HomePage.UnitTests.Services {

    [TestFixture]
    public class UnitTest1 {
        HomePage _homePage;

        [SetUp]
        public void SetUp() {
            _homePage = new HomePage();

        }

        [Test]
        public void Test1() {
            var result = _homePage.IsOdd(2);

            Assert.IsFalse(result, "2 should not be odd");

        }
    }
}