using NUnit.Framework;
using ProfilePage.Services;

namespace ProfilePage.UnitTests.Services
{
    [TestFixture]
    public class UnitTest1
    {
        ProfilePage _profilePage;

        [SetUp]
        public void Setup()
        {
            _profilePage = new ProfilePage();
        }

        [Test]
        public void Test1()
        {
            var result = _profilePage.IsEven(1);

            Assert.IsFalse(result, "1 should not be even");
        }
    }
}
