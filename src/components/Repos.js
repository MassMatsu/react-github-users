import React from 'react';
import { GithubContext } from '../context/context';
import styled from 'styled-components';
import { Pie3D, Doughnut2D, Column3D, Bar3D } from './Charts/index';

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

  const projects = repos.reduce(
    (total, repo, index) => {
      const { name, stargazers_count, forks } = repo;
      total.stars[index] = { label: name, value: stargazers_count };
      total.forks[index] = { label: name, value: forks };
      return total;
    },
    { stars: {}, forks: {} }
  );

  const { stars, forks } = projects;
  const projectStars = Object.values(stars)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
  const projectForks = Object.values(forks)
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);

  console.log(projectStars);
  console.log(projectForks);

  return (
    <section className='section'>
      <Wrapper className='section-center'>
        <Pie3D data={usedLanguages} />
        <Column3D data={projectStars} />
        <Doughnut2D data={popularLanguages} />
        <Bar3D data={projectForks} />
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
