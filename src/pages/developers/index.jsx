/* eslint max-len: 'off' */

import React from 'react';
import { Link, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { routePropTypes } from '../../utils/routes';
import HeaderFooterLayout from '../../layouts/headerfooter';
import SEO from '../../components/SEO'
import DevTile from './tile';

import './_developers.less';

const QSTRT = [{
    title: 'Android',
    route: 'android',
},
{
    title: 'iOS',
    route: 'ios',
},
{
    title: 'Web',
    route: 'web',
},
{
    title: 'Python',
    route: 'python',
},
{
    title: 'Node',
    route: 'node',
},
{
    title: 'Java',
    route: 'java',
},
{
    title: 'HTTP',
    route: 'http',
}];

const SDKS = [{
    title: 'Android',
    route: 'android',
},
{
    title: 'iOS',
    route: 'ios',
},
{
    title: 'Web',
    route: 'web',
},
{
    title: 'Unity',
    route: 'unity',
},
{
    title: 'React Native',
    route: 'react-native',
},
{
    title: 'AMP',
    route: 'amp',
},
{
    title: 'Roku',
    route: 'roku',
},
{
    title: 'Cordova',
    route: 'cordova',
},
{
    title: 'Xamarin',
    route: 'xamarin',
},
{
    title: 'Xbox',
    route: 'uwp',
},
{
    title: 'Fire TV',
    route: 'android',
},
{
    title: 'Alexa',
    route: 'alexa',
},
{
    title: 'Flutter',
    route: 'flutter',
}];

const EVENTS = [{
    title: 'HTTP API',
    route: 'http',
},
{
    title: 'JSON Reference',
    route: 'json-reference',
},
{
    title: 'Go SDK',
    route: 'go',
},
{
    title: 'Python SDK',
    route: 'python',
},
{
    title: 'Node SDK',
    route: 'node',
},
{
    title: 'Ruby SDK',
    route: 'ruby',
},
{
    title: 'Java SDK',
    route: 'java',
}];

const TILES = [
    {
        title: 'Warehouse Sync API',
        content: 'The Warehouse Sync API lets you programmatically enrich profile data from data in Snowflake',
        route: 'warehouse-sync-api/overview',
    },
    {
        title: 'Data Planning API',
        content: 'The Data Planning API lets you programmatically define your data schema with Data Master',
        route: 'dataplanning-api',
    },
    {
        title: 'Data Subject Request API',
        content: 'Submit data subject requests for GDPR and CCPA compliance via the OpenDSR API.',
        route: 'dsr-api/v3',
    },
    {
        title: 'IDSync API',
        content: 'The IDSync API allows you to manage user identities',
        route: 'idsync/http-api/',
    },
    {
        title: 'iOS 14 ATT Guide',
        content: 'Recommended timeframes and implementation overviews of what should be updated for iOS 14.',
        route: 'sdk/ios/ios14',
    },
    {
        title: 'Rules',
        content: 'mParticle rules allow you to cleanse and transform data before it\'s sent to each output.',
        route: 'rules',
    },
    {
        title: 'Profile API',
        content: 'The Profile API allows you to access user profiles at scale to power personalized experiences.',
        route: 'profile-api',
    },
    {
        title: 'Partners',
        content: 'Become a partner - use mParticle\'s partner APIs to make your platform available as a data Input or Output.',
        route: 'partners/',
    },
    {
        title: 'Smartype',
        content: 'Smartype is a code-generation framework to manage your data plans as code.',
        route: 'smartype',
    },
    {
        title: 'Smartype Linting',
        content: 'Provides a set of tools to lint your code against your data plan.',
        route: 'linting',
    },
    {
        title: 'Calculated Attributes API',
        content: 'Send seeds for your calculated attributes.',
        route: 'ca-seeding-api/',
    },
    {
        title: 'mParticle CLI',
        content: 'The mParticle Command Line Interface (CLI) allows developers to access mParticle services via a terminal environment of their choice.',
        route: 'cli',
    },
    {
        title: 'Data Hosting Locations',
        content: 'mParticle Organizations are hosted in localized regions around the world. This impacts the login URL for the dashboard, API Endpoints, and other services. ',
        route: 'data-localization/',
    },
    {
        title: 'Platform API',
        content: 'The mParticle platform API allows you to programmatically update your mParticle inputs, outputs, filters and more.',
        route: 'platform',
    },
    {
        title: 'Segment Migration Guide',
        content: 'Migrate your Segment implementation to mParticle',
        route: 'migration/segment/overview/',
    },
];

const MEDIA = {
    title: 'Media SDK',
    content: 'The Media SDK lets you track media events and heartbeats across platforms including Android, iOS, and Web to drive personalized experiences for better engagement and LTV.',
    route: 'www.mparticle.com',
};
const DevContent = (props) => (
    <HeaderFooterLayout location={props.location} metadata={props.data.pageMetadata}>
        <SEO
            title='mParticle developer documentation'
            description='Learn more about implementing mParticle with detailed documentation on our client SDKs and HTTP APIs.'
        />
        <div className='developer main-content'>
            <h1 id='developer-hub-title'>Developers</h1>
            <p className='large'>
                This section contains detailed documentation on implementing our client SDKs and HTTP APIs. For more business-oriented information on mParticle features, try the
                {' '}
                <Link to='/guides/'>Guides</Link>
                {' '}
                section.
            </p>
            <div className='dev-tiles'>
                <div className='dev-tile section'>
                    <div className='dev-tile-header'>
                        <span className='icon-tile' />
                        <h3>Getting Started</h3>
                    </div>
                    <div className='dev-tiles'>
                        {QSTRT.map((sdk) => (
                            <DevTile
                                key={`${sdk.title}${sdk.route}`}
                                data={{
                                    ...sdk,
                                    route: `quickstart/${sdk.route}/create-input/`,
                                }} />
                        ))}
                    </div>
                </div>
                <div className='dev-tile section'>
                    <div className='dev-tile-header'>
                        <span className='icon-tile' />
                        <h3>Client SDKs</h3>
                    </div>
                    <div className='dev-sdk-tiles'>
                        {SDKS.map((sdk) => (
                            <DevTile
                                key={`${sdk.title}${sdk.route}`}
                                data={{
                                    ...sdk,
                                    route: `sdk/${sdk.route}/`,
                                }} />
                        ))}
                    </div>
                </div>
                <div className='dev-tile section'>
                    <div className='dev-tile-header'>
                        <span className='icon-tile' />
                        <h3>Events API</h3>
                    </div>
                    <div className='dev-events-tiles'>
                        {EVENTS.map((event) => (
                            <DevTile
                                key={`${event.route}${event.title}`}
                                data={{
                                    ...event,
                                    route: `server/${event.route}/`,
                                }} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='dev-tiles'>
                {TILES.map((event) => (
                    <div
                        key={`${event.title}${event.route}`}
                        className='dev-tile section'>
                        <div className='dev-tile-header'>
                            <span className='icon-tile' />
                            <Link
                                className='header-links'
                                to={`${event.route}`}>
                                <h3>{event.title}</h3>
                            </Link>
                        </div>
                        <div className='dev-tile-content'>
                            <p>{event.content}</p>
                            <Link
                                to={`${event.route}/`}
                                className='learn-more'>
                                <div className='content'>
                                    <span id='learn-more'>Learn More</span>
                                </div>
                            </Link>
                        </div>
                    </div>
                ))}

                <div
                    key={`${MEDIA.title}${MEDIA.route}`}
                    className='dev-tile section'>
                    <div className='dev-tile-header'>
                        <span className='icon-tile' />
                        <h3>{MEDIA.title}</h3>
                    </div>
                    <div className='dev-tile-content'>
                        <p>{MEDIA.content}</p>
                        <Link
                            data-cy='dev-tile-media-sdk-android-learn-more'
                            to='sdk/android/media/'
                            className='learn-more'>
                            <div className='content'>
                                <span id='learn-more'>Android</span>
                            </div>
                        </Link>
                        <p />
                        <Link
                            data-cy='dev-tile-media-sdk-ios-learn-more'
                            to='sdk/ios/media/'
                            className='learn-more'>
                            <div className='content'>
                                <span id='learn-more'>iOS</span>
                            </div>
                        </Link>
                        <p />
                        <Link
                            data-cy='dev-tile-media-sdk-web-learn-more'
                            to='sdk/web/media/'
                            className='learn-more'>
                            <div className='content'>
                                <span id='learn-more'>Web</span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </HeaderFooterLayout>
);

export const frontmatter = {
    title: 'Developers',
    showWhenLast: true,
    tocItem: true,
};

export const query = graphql`
    query {
        pageMetadata (path: {eq: "/developers/"}) {
            ...BreadcrumbMetadata
        }
    }
`;

DevContent.propTypes = {
    location: routePropTypes.location.isRequired,
    data: PropTypes.shape({
        pageMetadata: routePropTypes.pageMetadata,
    }).isRequired,
};

export default DevContent;
