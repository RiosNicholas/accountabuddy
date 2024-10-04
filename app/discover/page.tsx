"use client"

export default function MatchMaking() {
    const dummyData = {
        'name': "Corbin Grosso",
        'school': 'Rutgers University - Newark',
        'prompts': [
            {"Favorite Color": "Red"},
            {"Meeting Preference": "Virtual"}
        ],
        'blurb': "Hi! I'm Corbin, and I'm one of the people who made this web app!"
    }

    function ProfileCard() {
        return <div>Profile Card</div>
    }

    return (
        <div id="MatchMakingPage">
            <div id="MatchMakingHeader">
                <h1>Matchmaking</h1>
            </div>
            <div id="MatchMakingBody">
                <ProfileCard />
            </div>
        </div>
    );
}
