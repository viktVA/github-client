import {useState, useEffect} from 'react';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {getRepos } from "@api/getRepos";
import styles from './RepoListPage.module.scss';
import Text from "@components/Text";
import classNames from 'classnames';
import MultiDropdown from "@components/MultiDropdown";
import type {Option} from "@components/MultiDropdown";
import Input from "@components/Input";
import Button from "@components/Button";
import Card from "@components/Card";
import {workDate} from "@utils/workDate";
import {routes} from "@config/routes";
import type {Repo} from "@custom_types/repos";

const RepoListPage = () => {
    const [repos, setRepos] = useState<Repo[]>([]);
    const [URLSearcParams] = useSearchParams();
    const page = Number(URLSearcParams.get("page")) || 1;
    const [countRep, setCountRep] = useState<number>(9);



    // Запрос к api
    useEffect(() => {

        const fetch = async () => {
            try {
                const result  = await getRepos();
                setRepos(result);
            } catch (error) {
                console.error(error);
            }
        };
        fetch();

    }, []);


    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 893 || (2500 > window.innerWidth && window.innerWidth >= 2000)) {
                setCountRep(8);
            }else if(2500 <= window.innerWidth) {
                setCountRep(10);
            } else {
                setCountRep(9);
            }
        }
        handleResize();
        window.addEventListener('resize',handleResize);

        return () => window.removeEventListener('resize', handleResize);

    }, []);


    useEffect(() => {
        window.scrollTo(0,0);
    },[page]);


    const totalPage: number[] = [];
    const maxPage =  Math.ceil(repos.length/countRep);
    if (maxPage <= 5) {
        for (let i = 2; i < maxPage; i++) {
            totalPage.push(i)
        }
    } else {
        if (page <= 3) {
            totalPage.push(2,3,4);
        } else if (page >= maxPage - 2) {
            totalPage.push(maxPage - 3, maxPage - 2, maxPage - 1)
        } else {
            totalPage.push(page - 1, page, page + 1);
        }

    }

    const strokeArrowLeft = (page === 1) ? '#AFADB5' : '#151411';
    const strokeArrowRight = (page  === maxPage) ? '#AFADB5' : '#151411';

    //MultiDropDown

    const options: Option[] = [{'key': 'org', 'value': 'Organization'}];
    const [valueType, setValueType] = useState<Option[]>([]);

    const getTitle = (value: Option[]): string => {
        if (value.length > 0) {
            return value.map(item => item['value']).join(' ,');
        }
        return 'Type';
    };

    const handleChangeType = (value: Option[]): void => {
        setValueType(value);
    };

    //InputSearch

    const [valueSearchInput, setValueSearchInput] = useState<string>(''); // значение для InputSearch

    const handleChangeSearchInput = (value: string) : void => {
        setValueSearchInput(value);
    };

    //Card
    const navigate = useNavigate();


    return (

      <div className={styles["list-repositories"]}>

          <div className={styles['list-repositories__container']}>
              <div className={styles["list-repositories__title"]}>
                  <Text view={'title'}
                        color={'primary'}
                        tag={'h1'}>
                      List of organization repositories
                  </Text>
              </div>
              <div className={styles["list-repositories__body"]}>

                  <div className={styles["list-repositories__input"]}>
                      <MultiDropdown className={styles["list-repositories__input-type"]}
                                     options={options}
                                     value={valueType}
                                     getTitle={getTitle}
                                     onChange={handleChangeType}
                      />

                      <div className={classNames(styles["list-repositories__input-search"],styles["input-search"])}>
                          <Input className={styles["input-search__input"]}
                                 onChange={handleChangeSearchInput}
                                 value={valueSearchInput}
                                 placeholder={'Enter organization name'}
                          />
                          <Button className={styles["input-search__button"]}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_508_313)">
                                      <path d="M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z" fill="white"/>
                                  </g>
                                  <defs>
                                      <clipPath id="clip0_508_313">
                                          <rect width="24" height="24" fill="white"/>
                                      </clipPath>
                                  </defs>
                              </svg>

                          </Button>
                      </div>
                  </div>

                  <div className={classNames(styles["list-repositories__cards"], styles["cards-grid"])}>
                      <div className={styles["cards-grid__items"]}>
                          {repos.slice((page - 1) * countRep, (repos.length < page * countRep) ? repos.length : page * countRep).map(item => (
                              <Card className={classNames(styles["cards-grid__item"],styles.item)}
                                    key={item.id}
                                    onClick={() => navigate(routes.repository.create(item.owner.login, item.name))}
                                    image={item.owner.avatar_url}
                                    captionSlot={
                                        <div className={styles['item__caption']}>
                                            <div className={styles['item__caption-star']}>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" clipRule="evenodd" d="M6.99999 0.21875C7.1225 0.218671 7.24259 0.252887 7.34666 0.317526C7.45073 0.382165 7.53463 0.474645 7.58887 0.5845L9.23562 3.92262L12.9194 4.45812C13.0405 4.47572 13.1543 4.52686 13.248 4.60575C13.3416 4.68465 13.4112 4.78816 13.4491 4.90458C13.487 5.021 13.4915 5.1457 13.4622 5.26457C13.4329 5.38344 13.371 5.49175 13.2834 5.57725L10.6181 8.176L11.2472 11.844C11.268 11.9647 11.2546 12.0888 11.2085 12.2022C11.1624 12.3157 11.0854 12.414 10.9864 12.486C10.8873 12.558 10.7701 12.6009 10.648 12.6097C10.5258 12.6186 10.4036 12.5931 10.2952 12.5361L6.99999 10.8036L3.70474 12.5361C3.59641 12.593 3.47432 12.6185 3.35228 12.6096C3.23024 12.6008 3.1131 12.558 3.01409 12.4861C2.91507 12.4142 2.83813 12.3161 2.79195 12.2028C2.74577 12.0895 2.73219 11.9655 2.75274 11.8449L3.38274 8.17513L0.715741 5.57725C0.627862 5.49178 0.565678 5.38341 0.536237 5.26441C0.506795 5.14541 0.511273 5.02055 0.549163 4.90396C0.587053 4.78738 0.656839 4.68374 0.750615 4.60478C0.844391 4.52583 0.958406 4.47472 1.07974 4.45725L4.76349 3.92262L6.41112 0.5845C6.46535 0.474645 6.54925 0.382165 6.65332 0.317526C6.75739 0.252887 6.87748 0.218671 6.99999 0.21875V0.21875ZM6.99999 2.35813L5.78812 4.8125C5.74105 4.90779 5.67156 4.99022 5.58559 5.05271C5.49963 5.1152 5.39978 5.15588 5.29462 5.17125L2.58474 5.565L4.54474 7.476C4.621 7.55026 4.67805 7.64195 4.71098 7.74316C4.7439 7.84438 4.75172 7.95209 4.73374 8.057L4.27174 10.7555L6.69462 9.4815C6.78879 9.43199 6.89359 9.40612 6.99999 9.40612C7.10639 9.40612 7.21119 9.43199 7.30537 9.4815L9.72912 10.7555L9.26537 8.057C9.24739 7.95209 9.2552 7.84438 9.28813 7.74316C9.32106 7.64195 9.37811 7.55026 9.45437 7.476L11.4144 5.56588L8.70537 5.17212C8.60021 5.15676 8.50035 5.11608 8.41439 5.05359C8.32843 4.9911 8.25893 4.90866 8.21187 4.81337L6.99999 2.35725V2.35813Z" fill="#FF9432"/>
                                                </svg>
                                                {item.stargazers_count}
                                            </div>
                                            <div className={styles['item__caption-update']}>
                                                Update {workDate(item.updated_at)}

                                            </div>
                                        </div>
                                    }
                                    title={item.name}
                                    subtitle={item.description}
                              />
                          ))
                          }
                      </div>

                  </div>

                  <nav className={classNames(styles["list-repositories__pages"], styles['pages'])}>
                      <div className={styles['pages__arrow']} onClick={() => (page > 1) && navigate(`/repositories?page=${page - 1}`)}>
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M20.12 26.5599L11.4267 17.8666C10.4 16.8399 10.4 15.1599 11.4267 14.1333L20.12 5.43994"
                                  stroke={strokeArrowLeft} strokeWidth="1.5" strokeMiterlimit="10"
                                  strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>

                      </div>
                      <ul className={styles['pages__list']}>
                          <li className={classNames(styles['pages__item'],page === 1 && styles['pages__item_active'])} >
                              <Link to={'/repositories?page=1'}  > 1 </Link>
                          </li>
                          {page >= 5 &&
                              <li className={classNames(styles['pages__item'],styles['pages__item_ellipses'])}>
                                  ...
                              </li>
                          }

                          {
                              totalPage.map(item => (
                                  <li className={classNames(styles['pages__item'],page === item && styles['pages__item_active'])}>
                                      <Link to={`/repositories?page=${item}`}> {item} </Link>
                                  </li>

                              ))
                          }
                          {page <= maxPage - 4 &&
                              <li className={classNames(styles['pages__item'],styles['pages__item_ellipses'])}>
                                  ...
                              </li>
                          }
                          <li className={classNames(styles['pages__item'],page === maxPage && styles['pages__item_active'])}>
                              <Link to={`/repositories?page=${maxPage}`}> {maxPage} </Link>
                          </li>

                      </ul>


                      <div className={styles['pages__arrow']} onClick={() => (page < maxPage) && navigate(`/repositories?page=${page + 1}`)}>
                          <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                               xmlns="http://www.w3.org/2000/svg">
                              <path
                                  d="M11.88 26.5599L20.5733 17.8666C21.6 16.8399 21.6 15.1599 20.5733 14.1333L11.88 5.43994"
                                  stroke={strokeArrowRight} strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round"
                                  strokeLinejoin="round"/>
                          </svg>

                      </div>
                  </nav>
              </div>
          </div>

      </div>
    );
};
export default RepoListPage;