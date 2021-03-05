import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { Pie3D, Doughnut2D } from './Charts/index';

const Repos = () => {
  const { repos } = React.useContext(GithubContext);

  const languages = repos.reduce((total, repo) => {
    // languages -> {JavaScript:{...}, CSS:{...}, HTML:{...}}

    const { language, stargazers_count } = repo;
    if (!language) return total;
    if (!total[language]) {
      total[language] = { label: language, value: 1, stars: stargazers_count };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
        stars: total[language].stars + stargazers_count,
      };
    }
    return total;
  }, {});

  const usedLanguages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .slice(0, 5);

  const popularLanguages = Object.values(languages)
    .sort((a, b) => {
      return b.value - a.value;
    })
    .map((item) => {
      return { ...item, value: item.stars };
    })
    .slice(0, 5);

  console.log(popularLanguages);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={usedLanguages} />
        <div></div>
        <Doughnut2D data={popularLanguages} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;
