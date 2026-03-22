import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getRepo } from '@api/getRepo';
import type { RepoInfo } from '@custom_types/repo';
import { getReadme } from '@api/getReadme';
import styles from './RepoPage.module.scss';
import Text from '@components/Text';
import Loader from '@components/Loader';

const LANGUAGE_COLORS: Record<string, string> = {
    TypeScript: '#3178c6',
    JavaScript: '#f1e05a',
    HTML: '#e34c26',
    CSS: '#563d7c',
    SCSS: '#c6538c',
    Python: '#3572A5',
    Go: '#00ADD8',
    Java: '#b07219',
    Rust: '#dea584',
    Shell: '#89e051',
    Vue: '#41b883',
    Ruby: '#701516',
    Swift: '#F05138',
    Kotlin: '#A97BFF',
};

const getLangColor = (lang: string): string => LANGUAGE_COLORS[lang] ?? '#ccc';

const RepoPage = () => {
    const { owner, name } = useParams();
    const navigate = useNavigate();
    const [repo, setRepo] = useState<RepoInfo | null>(null);
    const [readme, setReadme] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                if (owner !== undefined && name !== undefined) {
                    setLoading(true);
                    const result = await getRepo(owner, name);
                    setRepo(result);

                    const readmeResult = await getReadme(owner, name);
                    setReadme(readmeResult);
                } else {
                    throw new Error('No information about owner or name');
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [owner, name]);

    if (loading) {
        return (
            <div className={styles['repo-page']}>
                <div className={styles['repo-page__container']}>
                    <div className={styles['repo-page__loader']}>
                        <Loader size="l" />
                    </div>
                </div>
            </div>
        );
    }

    if (!repo) return null;

    const langEntries = repo.languages ? Object.entries(repo.languages) : [];
    const langTotal = langEntries.reduce((sum, [, bytes]) => sum + bytes, 0);

    return (
        <div className={styles['repo-page']}>
            <div className={styles['repo-page__container']}>

                {/* Header: back + avatar + name */}
                <div className={styles['repo-page__header']}>
                    <button className={styles['repo-page__back']} onClick={() => navigate(-1)}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994"
                                stroke="#151411" strokeWidth="1.5" strokeMiterlimit="10"
                                strokeLinecap="round" strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    <img
                        className={styles['repo-page__avatar']}
                        src={repo.owner.avatar_url}
                        alt={repo.owner.login}
                    />
                    <Text tag="h1" view="title" color="primary">
                        {repo.name}
                    </Text>
                </div>

                {/* Homepage link */}
                {repo.homepage && (
                    <a
                        className={styles['repo-page__homepage']}
                        href={repo.homepage}
                        target="_blank"
                        rel="noreferrer"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M6.66667 8.66667C6.95256 9.04942 7.31754 9.36612 7.73717 9.59529C8.1568 9.82446 8.62102 9.96074 9.09845 9.99489C9.57587 10.029 10.055 9.96024 10.503 9.79319C10.9509 9.62614 11.3573 9.36471 11.6933 9.02667L13.6933 7.02667C14.2973 6.40171 14.6313 5.56944 14.6236 4.7055C14.6159 3.84157 14.2673 3.01534 13.6527 2.40077C13.0381 1.7862 12.2119 1.43763 11.348 1.42993C10.484 1.42222 9.65175 1.75625 9.02667 2.36L7.85333 3.52667"
                                stroke="#1F883D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            />
                            <path
                                d="M9.33334 7.33333C9.04745 6.95058 8.68247 6.63388 8.26284 6.40471C7.84321 6.17554 7.37899 6.03926 6.90156 6.00511C6.42414 5.97096 5.945 6.03976 5.49707 6.20681C5.04914 6.37386 4.64268 6.63529 4.30668 6.97333L2.30668 8.97333C1.70268 9.59829 1.36866 10.4306 1.37636 11.2945C1.38407 12.1584 1.73264 12.9847 2.34721 13.5992C2.96178 14.2138 3.78801 14.5624 4.65194 14.5701C5.51588 14.5778 6.34815 14.2438 6.97334 13.64L8.14001 12.4733"
                                stroke="#1F883D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            />
                        </svg>
                        {repo.homepage}
                    </a>
                )}

                {/* Topics */}
                {repo.topics && repo.topics.length > 0 && (
                    <div className={styles['repo-page__topics']}>
                        {repo.topics.map(topic => (
                            <span key={topic} className={styles['topic']}>
                                {topic}
                            </span>
                        ))}
                    </div>
                )}

                {/* Stats */}
                <div className={styles['repo-page__stats']}>
                    <div className={styles['stat']}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                fillRule="evenodd" clipRule="evenodd"
                                d="M8 0.25C8.14 0.25 8.28 0.287 8.397 0.363C8.515 0.438 8.611 0.542 8.673 0.668L10.269 3.905L13.908 4.524C14.048 4.548 14.177 4.611 14.28 4.706C14.384 4.8 14.458 4.924 14.493 5.061C14.527 5.198 14.521 5.342 14.475 5.476C14.43 5.609 14.345 5.727 14.233 5.814L11.626 7.972L12.129 11.63C12.149 11.771 12.129 11.915 12.07 12.045C12.011 12.175 11.914 12.286 11.792 12.363C11.669 12.44 11.526 12.482 11.38 12.483C11.234 12.484 11.091 12.445 10.967 12.369L8 10.625L5.033 12.369C4.909 12.445 4.766 12.484 4.62 12.483C4.474 12.482 4.331 12.44 4.208 12.363C4.086 12.286 3.989 12.175 3.93 12.045C3.871 11.915 3.851 11.771 3.871 11.63L4.374 7.972L1.767 5.814C1.655 5.727 1.57 5.609 1.525 5.476C1.479 5.342 1.473 5.198 1.507 5.061C1.542 4.924 1.616 4.8 1.72 4.706C1.823 4.611 1.952 4.548 2.092 4.524L5.731 3.905L7.327 0.668C7.389 0.542 7.485 0.438 7.603 0.363C7.72 0.287 7.86 0.25 8 0.25Z"
                                fill="#FF9432"
                            />
                        </svg>
                        <Text view="p-16" color="primary">{repo.stargazers_count} stars</Text>
                    </div>
                    <div className={styles['stat']}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M8 3C4.364 3 1.258 5.073 0 8C1.258 10.927 4.364 13 8 13C11.636 13 14.742 10.927 16 8C14.742 5.073 11.636 3 8 3ZM8 11.333C5.978 11.333 4.333 9.841 4.333 8C4.333 6.159 5.978 4.667 8 4.667C10.022 4.667 11.667 6.159 11.667 8C11.667 9.841 10.022 11.333 8 11.333ZM8 6C6.727 6 5.7 6.896 5.7 8C5.7 9.104 6.727 10 8 10C9.273 10 10.3 9.104 10.3 8C10.3 6.896 9.273 6 8 6Z"
                                fill="#AFADB5"
                            />
                        </svg>
                        <Text view="p-16" color="primary">{repo.watchers_count} watching</Text>
                    </div>
                    <div className={styles['stat']}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M5 3.25C5 4.216 4.216 5 3.25 5C2.284 5 1.5 4.216 1.5 3.25C1.5 2.284 2.284 1.5 3.25 1.5C4.216 1.5 5 2.284 5 3.25ZM5 3.25H7C7.796 3.25 8.559 3.566 9.122 4.128C9.684 4.691 10 5.454 10 6.25V9.75M10 9.75C9.034 9.75 8.25 10.534 8.25 11.5C8.25 12.466 9.034 13.25 10 13.25C10.966 13.25 11.75 12.466 11.75 11.5C11.75 10.534 10.966 9.75 10 9.75ZM10 9.75V6.25C10 6.25 10 5 11.5 5C12.75 5 14.5 5 14.5 5"
                                stroke="#AFADB5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                            />
                            <circle cx="14" cy="3.25" r="1.5" stroke="#AFADB5" strokeWidth="1.5" />
                        </svg>
                        <Text view="p-16" color="primary">{repo.forks_count} forks</Text>
                    </div>
                </div>

                {/* Contributors + Languages */}
                <div className={styles['repo-page__main']}>

                    {/* Contributors */}
                    {repo.contributors && repo.contributors.length > 0 && (
                        <div className={styles['repo-page__contributors']}>
                            <Text tag="h3" view="p-20" weight="bold" className={styles['repo-page__section-title']}>
                                Contributors
                            </Text>
                            <div className={styles['contributors-list']}>
                                {repo.contributors.map(contributor => (
                                    <a
                                        key={contributor.login}
                                        href={`https://github.com/${contributor.login}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={styles['contributor']}
                                    >
                                        <img
                                            className={styles['contributor__avatar']}
                                            src={contributor.avatar_url}
                                            alt={contributor.login}
                                        />
                                        <Text view="p-16" color="primary">{contributor.login}</Text>
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Languages */}
                    {langEntries.length > 0 && (
                        <div className={styles['repo-page__languages']}>
                            <Text tag="h3" view="p-20" weight="bold" className={styles['repo-page__section-title']}>
                                Languages
                            </Text>
                            <div className={styles['lang-bar']}>
                                {langEntries.map(([lang, bytes]) => (
                                    <div
                                        key={lang}
                                        className={styles['lang-bar__segment']}
                                        style={{
                                            width: `${(bytes / langTotal) * 100}%`,
                                            backgroundColor: getLangColor(lang),
                                        }}
                                        title={`${lang}: ${((bytes / langTotal) * 100).toFixed(1)}%`}
                                    />
                                ))}
                            </div>
                            <div className={styles['lang-list']}>
                                {langEntries.map(([lang, bytes]) => (
                                    <div key={lang} className={styles['lang-list__item']}>
                                        <span
                                            className={styles['lang-list__dot']}
                                            style={{ backgroundColor: getLangColor(lang) }}
                                        />
                                        <Text view="p-14" color="primary">
                                            {lang} {((bytes / langTotal) * 100).toFixed(1)}%
                                        </Text>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* README */}
                {readme && (
                    <div className={styles['readme']}>
                        <div className={styles['readme__header']}>
                            <Text view="p-16" weight="bold" color="primary">README.md</Text>
                        </div>
                        <div className={styles['readme__content']}>
                            <div className={styles['readme__body']}>
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {readme}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default RepoPage;
